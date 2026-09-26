import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-semibold">Nuevo proyecto</h1>
      <p className="mt-1 mb-6 text-sm text-slate-400">
        El resumen sale en la tarjeta. La descripción y las fotos, en la página del proyecto.
      </p>
      <ProjectForm />
    </main>
  );
}
