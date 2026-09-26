"use client";

import { deleteProject } from "@/app/admin/actions";

export function DeleteProjectButton({ id, label = "Eliminar" }: { id: string; label?: string }) {
  return (
    <form
      action={deleteProject}
      onSubmit={(event) => {
        if (!window.confirm("¿Eliminar este proyecto y sus fotos?")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded-lg border border-red-900 px-3 py-2 text-sm text-red-300 hover:bg-red-950/40">
        {label}
      </button>
    </form>
  );
}
