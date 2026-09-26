export type ProjectImage = {
  id: string;
  storagePath: string;
  alt: string;
  sortOrder: number;
  url: string | null;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  repoUrl: string | null;
  demoUrl: string | null;
  tech: string[];
  coverUrl: string | null;
  sortOrder: number;
  published: boolean;
  images: ProjectImage[];
};

/**
 * Misma lista que la migración SQL.
 * Se usa cuando faltan NEXT_PUBLIC_SUPABASE_URL o la clave anónima,
 * y también si la consulta a Supabase falla.
 */
export const seedProjects: Project[] = [
  {
    id: "seed-farmacia",
    title: "Farmacia",
    slug: "farmacia",
    summary:
      "Punto de venta e inventario de farmacia: sucursales, lotes FEFO, asistencia y reportes.",
    description:
      "Sistema de punto de venta e inventario para farmacia, hecho con Next.js y Supabase. Cubre el inventario por sucursal, lotes con rotación FEFO, asistencia y reportes.",
    repoUrl: "https://github.com/ESPACEX88/Farmacia",
    demoUrl: "https://farmacia-tan-two.vercel.app",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
    coverUrl: null,
    sortOrder: 1,
    published: true,
    images: [],
  },
  {
    id: "seed-comunion",
    title: "Comunión",
    slug: "comunion",
    summary: "App para leer la Biblia en dúo, con auth, versículos y preview en Expo.",
    description:
      "Aplicación móvil y espiritual en Expo y React Native: autenticación, versículos y lectura compartida. No hay una URL web pública; el avance se abre con Expo Go mediante un preview de EAS.",
    repoUrl: "https://github.com/ESPACEX88/comunion",
    demoUrl: null,
    tech: ["Expo", "React Native", "TypeScript", "Supabase"],
    coverUrl: null,
    sortOrder: 2,
    published: true,
    images: [],
  },
  {
    id: "seed-space-manager",
    title: "Space Manager",
    slug: "space-manager",
    summary: "Administración y control de espacios físicos para instituciones académicas.",
    description:
      "Proyecto de titulación (UAPT). Sistema en Laravel para la administración y el control de espacios físicos en instituciones académicas.",
    repoUrl: "https://github.com/ESPACEX88/space-manager",
    demoUrl: null,
    tech: ["Laravel", "PHP", "Vue.js"],
    coverUrl: null,
    sortOrder: 3,
    published: true,
    images: [],
  },
];
