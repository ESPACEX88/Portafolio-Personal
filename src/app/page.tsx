import type { ReactNode } from "react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ProjectCover } from "@/components/ProjectCover";
import { getPublishedProjects } from "@/lib/projects";
import { profile } from "@/lib/profile";

export const dynamic = "force-dynamic";

const frontend = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML/CSS", "JavaScript"];
const backend = ["Node.js", "Python", "PostgreSQL", "REST APIs", "Automatización", "SQL"];
const tools = ["Git", "GitHub", "Docker", "VS Code", "Figma", "AWS", "Linux"];

export default async function Home() {
  const projects = await getPublishedProjects();

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-3">
          <Link href="/" className="font-display text-lg font-bold sm:text-xl">
            <span className="gradient-text">{profile.name}</span>
          </Link>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm sm:gap-x-8">
            <a href="#about" className="transition-colors hover:text-blue-400">Sobre mí</a>
            <a href="#skills" className="transition-colors hover:text-blue-400">Habilidades</a>
            <a href="#projects" className="transition-colors hover:text-blue-400">Proyectos</a>
            <a href="#contact" className="transition-colors hover:text-blue-400">Contacto</a>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-sm tracking-[0.25em] text-blue-400 uppercase opacity-0 animate-fade-in-up">
            Hola, soy
          </p>
          <h1 className="mb-6 font-display text-5xl font-bold opacity-0 animate-fade-in-up delay-100 md:text-7xl">
            <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="mb-6 text-xl text-slate-300 opacity-0 animate-fade-in-up delay-200 md:text-2xl">
            Desarrollador full stack y creador de soluciones digitales
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-slate-400 opacity-0 animate-fade-in-up delay-300">
            Construyo aplicaciones web modernas y sistemas automatizados para resolver problemas diarios de empresas.
            Apasionado por transformar ideas en realidad a través del código.
          </p>
          <div className="flex justify-center gap-3 opacity-0 animate-fade-in-up delay-400">
            <a href="#projects" className="rounded-full bg-blue-600 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500">
              Ver proyectos
            </a>
            <a href="#contact" className="rounded-full border border-slate-700 px-7 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-blue-400 hover:text-white">
              Contactar
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">
            <span className="gradient-text">Sobre mí</span>
          </h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-1 glow">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-900">
                <ProfileAvatar />
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Desarrollador apasionado por crear soluciones innovadoras
              </h3>
              <p className="mb-4 leading-relaxed text-slate-400">
                Soy un desarrollador con 2 años de experiencia en el diseño y desarrollo de aplicaciones web modernas
                y sistemas automatizados para empresas. Me especializo en crear experiencias de usuario intuitivas
                y funcionales, así como en optimizar procesos empresariales a través de la automatización.
              </p>
              <p className="mb-6 leading-relaxed text-slate-400">
                Cuando no estoy codificando, me puedes encontrar explorando nuevas tecnologías,
                contribuyendo a proyectos de código abierto, o compartiendo conocimiento con la comunidad.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-2xl font-bold gradient-text">2+</div>
                  <div className="text-xs text-slate-500">Años de experiencia</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">{projects.length}</div>
                  <div className="text-xs text-slate-500">Proyectos en este sitio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="bg-slate-900/50 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">
            <span className="gradient-text">Habilidades</span>
          </h2>
          <SkillGroup title="Frontend" skills={frontend} hover="hover:border-blue-500" />
          <SkillGroup title="Backend" skills={backend} hover="hover:border-violet-500" />
          <SkillGroup title="Herramientas" skills={tools} hover="hover:border-pink-500" />
        </div>
      </section>

      <section id="projects" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-center font-display text-3xl font-bold md:text-4xl">
            <span className="gradient-text">Proyectos</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
            Trabajo real, con repositorio y demo cuando existe una URL pública.
          </p>

          {projects.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-700 px-6 py-16 text-center text-slate-400">
              Todavía no hay proyectos publicados.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article key={project.id} className="card-hover overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                  <Link href={`/proyectos/${project.slug}`} className="block">
                    <ProjectCover title={project.title} coverUrl={project.coverUrl} tone={index} />
                  </Link>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">
                      <Link href={`/proyectos/${project.slug}`} className="hover:text-blue-300">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.summary}</p>
                    {project.tech.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((tag) => (
                          <li key={tag} className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-4 flex gap-4 text-sm">
                      {project.demoUrl ? (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          Demo
                        </a>
                      ) : null}
                      {project.repoUrl ? (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="bg-slate-900/50 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-3 font-display text-3xl font-bold md:text-4xl">
            <span className="gradient-text">¿Trabajamos juntos?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-400">
            ¿Tienes un proyecto en mente? ¿Quieres colaborar? No dudes en contactarme.
            Siempre estoy abierto a nuevas oportunidades y desafíos.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <ContactLink href={`mailto:${profile.email}`} label="Email" value={profile.email} icon={<MailIcon />} />
            <ContactLink href={profile.github} label="GitHub" value={profile.githubHandle} icon={<GitHubIcon />} external />
            <ContactLink href={profile.linkedin} label="LinkedIn" value={profile.linkedinLabel} icon={<LinkedInIcon />} external />
          </div>

          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} {profile.name}</p>
          <div className="flex gap-5 text-sm">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="text-slate-500 hover:text-white">
              Email
            </a>
            <Link href="/admin" className="text-slate-600 hover:text-slate-300">
              Panel
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SkillGroup({ title, skills, hover }: { title: string; skills: string[]; hover: string }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-300 uppercase">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className={`rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm ${hover}`}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactLink({
  href,
  label,
  value,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-left transition-colors hover:border-blue-500"
    >
      <span className="text-slate-300">{icon}</span>
      <span>
        <span className="block text-xs text-slate-500">{label}</span>
        <span className="block text-sm">{value}</span>
      </span>
    </a>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.8a9.6 9.6 0 0 1 2.5.34c1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M6.5 9H3.7v11.2h2.8V9ZM5.1 3.8A1.7 1.7 0 1 0 5.12 7.2 1.7 1.7 0 0 0 5.1 3.8ZM20.3 20.2h-2.8v-5.45c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.41-2.09 2.87v5.55H10.8V9h2.68v1.53h.04c.37-.7 1.28-1.45 2.64-1.45 2.82 0 3.34 1.86 3.34 4.28v6.84Z" />
    </svg>
  );
}
