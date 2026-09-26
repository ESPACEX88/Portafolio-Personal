import Link from "next/link";
import { moveProject } from "@/app/admin/actions";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";
import { requireAdmin } from "@/lib/admin-session";
import { mapProject } from "@/lib/projects";

export default async function AdminProjectsPage() {
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
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) console.error(error);

  const projects = (data ?? []).flatMap((row) => {
    const project = mapProject(row);
    return project ? [project] : [];
  });

  return (
    <main>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Proyectos</h1>
          <p className="mt-1 text-sm text-slate-400">Publicados y borradores. El sitio solo muestra los publicados.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Nuevo
        </Link>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300" role="alert">
          No se pudo leer la base. Aplica la migración y confirma que esta cuenta es la de administración.
        </p>
      ) : null}

      {!error && projects.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-700 px-4 py-10 text-center text-sm text-slate-400">
          Todavía no hay proyectos. Crea el primero.
        </p>
      ) : null}

      <ul className="overflow-hidden rounded-2xl border border-slate-800">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="flex flex-col gap-4 border-b border-slate-800 bg-slate-900/40 p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-medium">{project.title}</h2>
                <span
                  className={
                    project.published
                      ? "rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300"
                      : "rounded-full bg-slate-700/60 px-2 py-0.5 text-xs text-slate-300"
                  }
                >
                  {project.published ? "Publicado" : "Borrador"}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-400">{project.summary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <form action={moveProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="direction" value="up" />
                <button
                  type="submit"
                  disabled={index === 0}
                  className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 disabled:opacity-40"
                >
                  Subir
                </button>
              </form>
              <form action={moveProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="direction" value="down" />
                <button
                  type="submit"
                  disabled={index === projects.length - 1}
                  className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 disabled:opacity-40"
                >
                  Bajar
                </button>
              </form>
              <Link
                href={`/admin/projects/${project.id}`}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-200 hover:border-blue-500"
              >
                Editar
              </Link>
              <DeleteProjectButton id={project.id} label="Borrar" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
