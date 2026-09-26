import { cache } from "react";
import { seedProjects, type Project, type ProjectImage } from "@/data/projects";
import { projectPhotoUrl, isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const PROJECT_SELECT = `
  id,
  title,
  slug,
  summary,
  description,
  repo_url,
  demo_url,
  tech,
  cover_image_path,
  sort_order,
  published,
  project_images (
    id,
    storage_path,
    alt,
    sort_order
  )
`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asTech(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function safeHttpUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function mapProject(row: unknown): Project | null {
  if (!isRecord(row)) return null;
  if (typeof row.id !== "string" || typeof row.title !== "string" || typeof row.slug !== "string") {
    return null;
  }

  const rawImages = Array.isArray(row.project_images) ? row.project_images : [];
  const images: ProjectImage[] = rawImages.flatMap((image) => {
    if (!isRecord(image) || typeof image.id !== "string") return [];
    const storagePath = asString(image.storage_path);
    if (!storagePath) return [];
    return [
      {
        id: image.id,
        storagePath,
        alt: asString(image.alt, asString(row.title)),
        sortOrder: typeof image.sort_order === "number" ? image.sort_order : 0,
        url: projectPhotoUrl(storagePath),
      },
    ];
  });

  images.sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));

  const coverPath = asString(row.cover_image_path) || images[0]?.storagePath || "";

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: asString(row.summary),
    description: asString(row.description),
    repoUrl: safeHttpUrl(asString(row.repo_url) || null),
    demoUrl: safeHttpUrl(asString(row.demo_url) || null),
    tech: asTech(row.tech),
    coverUrl: projectPhotoUrl(coverPath || null),
    sortOrder: typeof row.sort_order === "number" ? row.sort_order : 0,
    published: row.published === true,
    images,
  };
}

async function queryProjects(filter?: { slug?: string; id?: string; publishedOnly?: boolean }) {
  const supabase = await createClient();
  let query = supabase.from("projects").select(PROJECT_SELECT);

  if (filter?.publishedOnly) {
    query = query.eq("published", true);
  }
  if (filter?.slug) {
    query = query.eq("slug", filter.slug);
  }
  if (filter?.id) {
    query = query.eq("id", filter.id);
  }

  return query
    .order("sort_order", { ascending: true })
    .order("sort_order", { foreignTable: "project_images", ascending: true });
}

export const getPublishedProjects = cache(async (): Promise<Project[]> => {
  if (!isSupabaseConfigured()) return seedProjects;

  try {
    const { data, error } = await queryProjects({ publishedOnly: true });
    if (error) {
      console.error("No se pudieron leer los proyectos publicados", error.message);
      return seedProjects;
    }

    return (data ?? []).flatMap((row) => {
      const project = mapProject(row);
      return project ? [project] : [];
    });
  } catch (error) {
    console.error("Supabase no respondió al listar proyectos", error);
    return seedProjects;
  }
});

export const getPublishedProject = cache(async (slug: string): Promise<Project | null> => {
  if (!isSupabaseConfigured()) {
    return seedProjects.find((project) => project.slug === slug) ?? null;
  }

  try {
    const { data, error } = await queryProjects({ slug, publishedOnly: true });
    if (error) {
      console.error("No se pudo leer el proyecto", error.message);
      return seedProjects.find((project) => project.slug === slug) ?? null;
    }

    const row = Array.isArray(data) ? data[0] : null;
    if (!row) return null;
    return mapProject(row);
  } catch (error) {
    console.error("Supabase no respondió al leer un proyecto", error);
    return seedProjects.find((project) => project.slug === slug) ?? null;
  }
});
