# Active Context: Portafolio Personal - José Posadas

## Current State

**Project Status**: Portafolio con proyectos reales y panel de administración sobre Supabase.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Formulario de contacto con AJAX (Formspree)
- [x] Proyectos reales en la portada: Farmacia, Comunión y Space Manager
- [x] Datos en `src/data/projects.ts` cuando faltan las variables de Supabase
- [x] Panel `/admin` (login, alta, edición, fotos, orden y borrado) solo para `posadasjosep8@gmail.com`
- [x] Migración `supabase/migrations/20260926152808_portfolio_projects.sql`
- [x] `lang="es"`, metadata de José Posadas, paquete `portafolio-personal`
- [x] Avatar con iniciales si no existe `public/foto-perfil.jpg`

## Current Structure

| File/Directory | Purpose |
|----------------|---------|
| `src/app/page.tsx` | Portafolio público |
| `src/app/proyectos/[slug]/page.tsx` | Ficha de un proyecto publicado |
| `src/app/admin/` | Login y panel |
| `src/data/projects.ts` | Semilla / respaldo sin base de datos |
| `src/lib/supabase/` | Cliente de servidor y variables |
| `supabase/migrations/` | Esquema, RLS, bucket y proyectos iniciales |
| `.env.example` | URL y clave anónima |

## Enfoque Actual

El sitio público lee proyectos publicados de Supabase. Sin env, usa la semilla local. José tiene que crear el proyecto de Supabase, correr la migración, crear el usuario admin y pegar las variables en Vercel. Los pasos están en el README.

## Pending Improvements

- [ ] Subir `public/foto-perfil.jpg` cuando José tenga la foto
- [ ] Subir capturas desde el panel cuando el bucket esté creado
