# Portafolio de José Posadas

Sitio en Next.js con los proyectos publicados y un panel en `/admin` para crearlos, editarlos y borrarlos. Los datos viven en Supabase (Postgres, Auth y Storage). Si faltan las variables de entorno, la portada usa la lista de `src/data/projects.ts` para que el build siga pasando.

## Arranque local

```bash
bun install
cp .env.example .env.local
bun dev
```

Sin `.env.local` el sitio público muestra Farmacia, Comunión y Space Manager. El panel pide las variables antes de dejar entrar.

## Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, pega y ejecuta `supabase/migrations/20260926152808_portfolio_projects.sql`.
   También vale, con la CLI y el proyecto enlazado: `supabase db push`.
3. En **Authentication → Users**, crea el usuario `posadasjosep8@gmail.com` con contraseña y márcalo como confirmado. No hace falta registro público: en **Authentication → Providers → Email** puedes desactivar los signups.
4. Para el enlace mágico, en **Authentication → URL Configuration** agrega la URL del sitio y `https://TU-DOMINIO/auth/callback` (en local, `http://localhost:3000/auth/callback`).
5. Copia en `.env.local` (y en Vercel) la URL del proyecto y la clave **anon** / publishable:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Este repo no usa la service role.

6. Entra a `/admin/login`, abre un proyecto y sube fotos. La primera queda de portada; se pueden reordenar o quitar. El bucket `project-photos` es de lectura pública: una foto se puede abrir por su URL aunque el proyecto pase a borrador.

La foto de perfil es opcional. Si colocas `public/foto-perfil.jpg`, aparece en Sobre mí. Si no está, se muestran las iniciales.

## Scripts

```bash
bun run dev
bun run typecheck
bun run lint
bun run build
```
