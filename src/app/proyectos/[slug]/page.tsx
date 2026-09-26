import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/ProjectCover";
import { getPublishedProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: "Proyecto" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <Link href="/#projects" className="text-sm text-slate-400 hover:text-white">
        ← Proyectos
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold">{project.title}</h1>
      <p className="mt-4 text-lg text-slate-300">{project.summary}</p>

      {project.tech.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <li key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
            Demo
          </a>
        ) : null}
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">
            GitHub
          </a>
        ) : null}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
        <ProjectCover title={project.title} coverUrl={project.coverUrl} priority />
      </div>

      {project.description ? (
        <div className="mt-8 whitespace-pre-wrap text-slate-300 leading-relaxed">{project.description}</div>
      ) : null}

      {project.images.length > 1 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.images.slice(1).map((image) =>
            image.url ? (
              <li key={image.id} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-800">
                <Image src={image.url} alt={image.alt || project.title} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ) : null,
          )}
        </ul>
      ) : null}
    </main>
  );
}
