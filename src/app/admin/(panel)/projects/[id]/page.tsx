import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/admin-session";
import { mapProject } from "@/lib/projects";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const saveError = query.error?.slice(0, 240);
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
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
      project_images ( id, storage_path, alt, sort_order )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const project = mapProject(data);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-semibold">Editar {project.title}</h1>
      {query.saved === "1" ? (
        <p className="mt-3 rounded-lg border border-emerald-900 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-300" role="status">
          Cambios guardados.
        </p>
      ) : null}
      {saveError ? (
        <p className="mt-3 rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300" role="alert">
          {saveError}
        </p>
      ) : null}
      <div className="mt-6">
        <ProjectForm
          project={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            summary: project.summary,
            description: project.description,
            repoUrl: project.repoUrl ?? "",
            demoUrl: project.demoUrl ?? "",
            tech: project.tech.join(", "),
            sortOrder: project.sortOrder,
            published: project.published,
            images: project.images.map((image) => ({
              id: image.id,
              url: image.url,
              alt: image.alt,
              remove: false,
            })),
          }}
        />
      </div>
    </main>
  );
}
