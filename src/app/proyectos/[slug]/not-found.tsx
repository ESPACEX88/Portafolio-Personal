import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
      <h1 className="font-display text-3xl font-semibold">Proyecto no encontrado</h1>
      <p className="mt-3 text-slate-400">Puede que esté en borrador o que el enlace ya no exista.</p>
      <Link href="/#projects" className="mt-6 text-sm text-blue-400 hover:text-blue-300">
        Volver a proyectos
      </Link>
    </main>
  );
}
