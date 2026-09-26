"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin-session";
import { slugify } from "@/lib/slug";
import { PROJECT_PHOTOS_BUCKET, isSupabaseConfigured, siteOriginFromHeaders } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type FormState = {
  error?: string;
  message?: string;
};

const ALLOWED_IMAGE_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_NEW_IMAGES = 6;

type ExistingImageInput = {
  id: string;
  alt: string;
  remove: boolean;
};

function readText(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function parseHttpUrl(value: string, label: string) {
  if (!value) return { value: null as string | null };
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { error: `${label} debe empezar con http o https.` };
    }
    return { value: url.toString() };
  } catch {
    return { error: `${label} no es una URL válida.` };
  }
}

function parseTech(value: string) {
  const tags = value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((tag) => tag.slice(0, 40));

  return [...new Set(tags)];
}

function parseExistingImages(raw: string): ExistingImageInput[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const record = item as Record<string, unknown>;
      if (typeof record.id !== "string") return [];
      return [
        {
          id: record.id,
          alt: typeof record.alt === "string" ? record.alt.trim().slice(0, 180) : "",
          remove: record.remove === true,
        },
      ];
    });
  } catch {
    return [];
  }
}

function dbMessage(error: { message: string; code?: string }) {
  console.error(error);
  if (error.code === "23505") return "Ya existe un proyecto con ese slug.";
  if (error.message.includes("relation") && error.message.includes("does not exist")) {
    return "Faltan las tablas. Aplica la migración de supabase/migrations en el proyecto de Supabase.";
  }
  return "No se pudo guardar. Revisa la conexión y que la migración esté aplicada.";
}

function revalidateProject(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/proyectos/${slug}`);
}

async function syncImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  projectId: string,
  title: string,
  existing: ExistingImageInput[],
  files: File[],
) {
  const { data: current, error: currentError } = await supabase
    .from("project_images")
    .select("id, storage_path")
    .eq("project_id", projectId);

  if (currentError) return dbMessage(currentError);

  const known = new Map(
    (current ?? []).map((row) => [row.id as string, row.storage_path as string]),
  );

  const removals = existing.filter((image) => image.remove && known.has(image.id));
  if (removals.length > 0) {
    const paths = removals.flatMap((image) => {
      const path = known.get(image.id);
      return path ? [path] : [];
    });
    if (paths.length > 0) {
      const { error } = await supabase.storage.from(PROJECT_PHOTOS_BUCKET).remove(paths);
      if (error) console.error(error);
    }
    const { error } = await supabase
      .from("project_images")
      .delete()
      .in(
        "id",
        removals.map((image) => image.id),
      );
    if (error) return dbMessage(error);
  }

  const kept = existing.filter((image) => !image.remove && known.has(image.id));
  for (const [index, image] of kept.entries()) {
    const { error } = await supabase
      .from("project_images")
      .update({
        sort_order: index,
        alt: image.alt || title,
      })
      .eq("id", image.id)
      .eq("project_id", projectId);
    if (error) return dbMessage(error);
  }

  let sortOrder = kept.length;
  for (const file of files) {
    const extension = ALLOWED_IMAGE_TYPES.get(file.type);
    if (!extension) return "Solo se aceptan fotos JPG, PNG, WEBP o GIF.";
    if (file.size > MAX_IMAGE_BYTES) return "Cada foto debe pesar menos de 5 MB.";

    const storagePath = `${projectId}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(PROJECT_PHOTOS_BUCKET)
      .upload(storagePath, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      console.error(uploadError);
      return "No se pudo subir una foto. Revisa el bucket project-photos y que tu usuario sea el admin.";
    }

    const { error: insertError } = await supabase.from("project_images").insert({
      project_id: projectId,
      storage_path: storagePath,
      alt: title,
      sort_order: sortOrder,
    });
    if (insertError) return dbMessage(insertError);
    sortOrder += 1;
  }

  const { data: ordered, error: orderedError } = await supabase
    .from("project_images")
    .select("storage_path")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .limit(1);

  if (orderedError) return dbMessage(orderedError);

  const cover = ordered?.[0]?.storage_path ?? null;
  const { error: coverError } = await supabase
    .from("projects")
    .update({ cover_image_path: cover })
    .eq("id", projectId);

  if (coverError) return dbMessage(coverError);
  return null;
}

export async function saveProject(_state: FormState | null, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const id = readText(formData, "id");
  const title = readText(formData, "title");
  const summary = readText(formData, "summary");
  const description = readText(formData, "description");
  const requestedSlug = slugify(readText(formData, "slug") || title);
  const tech = parseTech(readText(formData, "tech"));
  const published = formData.get("published") === "on";
  const sortRaw = readText(formData, "sort_order");

  if (title.length < 2 || title.length > 120) {
    return { error: "El título debe tener entre 2 y 120 caracteres." };
  }
  if (!summary || summary.length > 500) {
    return { error: "El resumen es obligatorio y debe caber en 500 caracteres." };
  }
  if (description.length > 8000) {
    return { error: "La descripción es demasiado larga." };
  }
  if (!requestedSlug) {
    return { error: "No se pudo armar un slug a partir del título." };
  }

  const repo = parseHttpUrl(readText(formData, "repo_url"), "El repositorio");
  if (repo.error) return { error: repo.error };
  const demo = parseHttpUrl(readText(formData, "demo_url"), "La demo");
  if (demo.error) return { error: demo.error };

  let sortOrder = Number.parseInt(sortRaw, 10);
  if (sortRaw && !Number.isFinite(sortOrder)) {
    return { error: "El orden debe ser un número entero." };
  }

  const files = formData
    .getAll("photos")
    .filter((item): item is File => item instanceof File && item.size > 0);

  if (files.length > MAX_NEW_IMAGES) {
    return { error: `Sube como máximo ${MAX_NEW_IMAGES} fotos a la vez.` };
  }

  const payload = {
    title,
    slug: requestedSlug,
    summary,
    description,
    repo_url: repo.value,
    demo_url: demo.value,
    tech,
    published,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  };

  let projectId = id;
  let previousSlug = requestedSlug;

  if (id) {
    const { data: existing, error: existingError } = await supabase
      .from("projects")
      .select("slug, sort_order")
      .eq("id", id)
      .maybeSingle();

    if (existingError) return { error: dbMessage(existingError) };
    if (!existing) return { error: "Ese proyecto ya no existe." };
    previousSlug = existing.slug as string;
    if (!sortRaw) payload.sort_order = existing.sort_order as number;

    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) return { error: dbMessage(error) };
  } else {
    if (!sortRaw) {
      const { data: last } = await supabase
        .from("projects")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1);
      const maxOrder = typeof last?.[0]?.sort_order === "number" ? last[0].sort_order : 0;
      payload.sort_order = maxOrder + 1;
    }

    const { data, error } = await supabase.from("projects").insert(payload).select("id").single();
    if (error) return { error: dbMessage(error) };
    projectId = data.id as string;
  }

  const imageError = await syncImages(
    supabase,
    projectId,
    title,
    parseExistingImages(readText(formData, "existing_images")),
    files,
  );

  revalidateProject(previousSlug);
  revalidateProject(requestedSlug);

  if (imageError) {
    redirect(`/admin/projects/${projectId}?error=${encodeURIComponent(imageError)}`);
  }

  redirect(`/admin/projects/${projectId}?saved=1`);
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = readText(formData, "id");
  if (!id) redirect("/admin");

  const { data: images } = await supabase
    .from("project_images")
    .select("storage_path")
    .eq("project_id", id);

  const paths = (images ?? []).flatMap((row) =>
    typeof row.storage_path === "string" ? [row.storage_path] : [],
  );
  if (paths.length > 0) {
    await supabase.storage.from(PROJECT_PHOTOS_BUCKET).remove(paths);
  }

  const { data: project } = await supabase.from("projects").select("slug").eq("id", id).maybeSingle();
  await supabase.from("projects").delete().eq("id", id);

  revalidateProject(typeof project?.slug === "string" ? project.slug : undefined);
  redirect("/admin");
}

export async function moveProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = readText(formData, "id");
  const direction = formData.get("direction") === "up" ? -1 : 1;
  if (!id) return;

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error || !projects) return;

  const index = projects.findIndex((project) => project.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= projects.length) return;

  const next = [...projects];
  const [item] = next.splice(index, 1);
  if (!item) return;
  next.splice(target, 0, item);

  for (const [order, project] of next.entries()) {
    if (project.sort_order !== order) {
      await supabase.from("projects").update({ sort_order: order }).eq("id", project.id);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function loginWithPassword(_state: FormState | null, formData: FormData): Promise<FormState> {
  if (!isSupabaseConfigured()) {
    return { error: "Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY." };
  }

  const email = readText(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!isAdminEmail(email)) {
    return { error: "Esta cuenta no puede entrar al panel." };
  }
  if (!password) {
    return { error: "Escribe la contraseña." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect("/admin");
}

export async function sendMagicLink(_state: FormState | null, formData: FormData): Promise<FormState> {
  if (!isSupabaseConfigured()) {
    return { error: "Faltan las variables de Supabase." };
  }

  const email = readText(formData, "email").toLowerCase();
  if (!isAdminEmail(email)) {
    return { error: "El enlace solo se envía a la cuenta de administración." };
  }

  const headerStore = await headers();
  const origin = siteOriginFromHeaders(headerStore);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      shouldCreateUser: false,
    },
  });

  if (error) {
    console.error(error);
    return { error: "No se pudo enviar el enlace. Revisa el usuario en Supabase Auth y la URL de redirección." };
  }

  return { message: "Revisa el correo. El enlace abre el panel si la sesión es de la cuenta admin." };
}

export async function logout() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
