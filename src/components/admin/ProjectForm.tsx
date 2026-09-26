"use client";

import { useActionState, useState } from "react";
import { saveProject, type FormState } from "@/app/admin/actions";
import { slugify } from "@/lib/slug";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

const fieldClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500";

export type EditableImage = {
  id: string;
  url: string | null;
  alt: string;
  remove: boolean;
};

export type EditableProject = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  repoUrl: string;
  demoUrl: string;
  tech: string;
  sortOrder: number;
  published: boolean;
  images: EditableImage[];
};

export function ProjectForm({ project }: { project?: EditableProject }) {
  const [state, action, pending] = useActionState(saveProject, null);
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [images, setImages] = useState<EditableImage[]>(project?.images ?? []);

  function updateTitle(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((current) => {
      const visible = current.filter((image) => !image.remove);
      const hidden = current.filter((image) => image.remove);
      const target = index + direction;
      if (target < 0 || target >= visible.length) return current;
      const next = [...visible];
      const [item] = next.splice(index, 1);
      if (!item) return current;
      next.splice(target, 0, item);
      return [...next, ...hidden];
    });
  }

  const visibleImages = images.filter((image) => !image.remove);

  return (
    <form action={action} className="space-y-5">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}
      <input type="hidden" name="existing_images" value={JSON.stringify(images)} />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm sm:col-span-2">
          <span className="text-slate-300">Título</span>
          <input
            name="title"
            required
            value={title}
            onChange={(event) => updateTitle(event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="text-slate-300">Slug</span>
          <input
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className={fieldClass}
          />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="text-slate-300">Orden</span>
          <input
            name="sort_order"
            type="number"
            defaultValue={project?.sortOrder ?? ""}
            placeholder="Al final"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="text-slate-300">Resumen</span>
        <textarea name="summary" required rows={3} defaultValue={project?.summary ?? ""} className={fieldClass} />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-slate-300">Descripción</span>
        <textarea
          name="description"
          rows={6}
          defaultValue={project?.description ?? ""}
          className={fieldClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm">
          <span className="text-slate-300">Repositorio</span>
          <input
            name="repo_url"
            type="url"
            placeholder="https://github.com/…"
            defaultValue={project?.repoUrl ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="space-y-1.5 text-sm">
          <span className="text-slate-300">Demo</span>
          <input
            name="demo_url"
            type="url"
            placeholder="https://…"
            defaultValue={project?.demoUrl ?? ""}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="text-slate-300">Tecnologías</span>
        <input
          name="tech"
          placeholder="Next.js, Supabase, TypeScript"
          defaultValue={project?.tech ?? ""}
          className={fieldClass}
        />
        <span className="text-xs text-slate-500">Sepáralas con comas.</span>
      </label>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          name="published"
          type="checkbox"
          defaultChecked={project?.published ?? true}
          className="size-4 accent-blue-500"
        />
        Publicado en el sitio
      </label>

      {visibleImages.length > 0 ? (
        <fieldset className="space-y-3">
          <legend className="text-sm text-slate-300">Fotos</legend>
          <ul className="space-y-3">
            {visibleImages.map((image, index) => (
              <li key={image.id} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                  {image.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image.url} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <label className="block text-xs text-slate-500">
                    Texto alternativo
                    <input
                      value={image.alt}
                      onChange={(event) => {
                        const alt = event.target.value;
                        setImages((current) =>
                          current.map((item) => (item.id === image.id ? { ...item, alt } : item)),
                        );
                      }}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => moveImage(index, -1)}
                      disabled={index === 0}
                      className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 disabled:opacity-40"
                    >
                      Subir
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(index, 1)}
                      disabled={index === visibleImages.length - 1}
                      className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 disabled:opacity-40"
                    >
                      Bajar
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setImages((current) =>
                          current.map((item) => (item.id === image.id ? { ...item, remove: true } : item)),
                        )
                      }
                      className="rounded-md border border-red-900 px-2 py-1 text-xs text-red-300"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">La primera foto es la portada.</p>
        </fieldset>
      ) : null}

      <label className="block space-y-1.5 text-sm">
        <span className="text-slate-300">Agregar fotos</span>
        <input
          name="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-2 file:text-sm file:text-slate-200"
        />
        <span className="text-xs text-slate-500">Hasta 6 por guardado, 5 MB cada una.</span>
      </label>

      {state?.error ? (
        <p className="rounded-lg border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-800"
        >
          {pending ? "Guardando…" : "Guardar"}
        </button>
        {project ? <DeleteProjectButton id={project.id} /> : null}
      </div>
    </form>
  );
}
