-- Portafolio: proyectos publicados y fotos.
-- La cuenta administradora se comprueba contra auth.users.email
-- (no contra user_metadata, que el usuario puede editar).
-- Mantén el correo alineado con ADMIN_EMAIL en src/lib/auth.ts
-- y los textos iniciales con src/data/projects.ts.

create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to anon, authenticated, service_role;

create or replace function private.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from auth.users
    where id = (select auth.uid())
      and lower(email) = 'posadasjosep8@gmail.com'
  );
$$;

revoke all on function private.is_portfolio_admin() from public;
grant execute on function private.is_portfolio_admin() to anon, authenticated, service_role;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function private.set_updated_at() from public;
grant execute on function private.set_updated_at() to authenticated;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) > 0),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  summary text not null default '',
  description text not null default '',
  repo_url text,
  demo_url text,
  tech text[] not null default '{}',
  cover_image_path text,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_published_sort_idx
  on public.projects (published, sort_order, created_at);

create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  storage_path text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index project_images_project_sort_idx
  on public.project_images (project_id, sort_order);

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function private.set_updated_at();

alter table public.projects enable row level security;
alter table public.project_images enable row level security;

revoke all on table public.projects from anon, authenticated;
revoke all on table public.project_images from anon, authenticated;

grant select on table public.projects to anon, authenticated;
grant insert, update, delete on table public.projects to authenticated;
grant select on table public.project_images to anon, authenticated;
grant insert, update, delete on table public.project_images to authenticated;

create policy "Lectura publica de proyectos publicados"
  on public.projects
  for select
  to anon, authenticated
  using (published = true or private.is_portfolio_admin());

create policy "El admin inserta proyectos"
  on public.projects
  for insert
  to authenticated
  with check (private.is_portfolio_admin());

create policy "El admin actualiza proyectos"
  on public.projects
  for update
  to authenticated
  using (private.is_portfolio_admin())
  with check (private.is_portfolio_admin());

create policy "El admin elimina proyectos"
  on public.projects
  for delete
  to authenticated
  using (private.is_portfolio_admin());

create policy "Lectura de fotos de proyectos publicados"
  on public.project_images
  for select
  to anon, authenticated
  using (
    private.is_portfolio_admin()
    or exists (
      select 1
      from public.projects
      where projects.id = project_images.project_id
        and projects.published = true
    )
  );

create policy "El admin inserta fotos"
  on public.project_images
  for insert
  to authenticated
  with check (private.is_portfolio_admin());

create policy "El admin actualiza fotos"
  on public.project_images
  for update
  to authenticated
  using (private.is_portfolio_admin())
  with check (private.is_portfolio_admin());

create policy "El admin elimina fotos"
  on public.project_images
  for delete
  to authenticated
  using (private.is_portfolio_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-photos',
  'project-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "El admin sube fotos de proyectos"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'project-photos'
    and private.is_portfolio_admin()
  );

create policy "El admin reemplaza fotos de proyectos"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'project-photos' and private.is_portfolio_admin())
  with check (bucket_id = 'project-photos' and private.is_portfolio_admin());

create policy "El admin borra fotos de proyectos"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'project-photos' and private.is_portfolio_admin());

create policy "El admin lista fotos de proyectos"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'project-photos' and private.is_portfolio_admin());

-- Proyectos reales iniciales. José puede editarlos después en /admin.
insert into public.projects (
  id,
  title,
  slug,
  summary,
  description,
  repo_url,
  demo_url,
  tech,
  sort_order,
  published
)
values
  (
    'a1111111-1111-4111-8111-111111111111',
    'Farmacia',
    'farmacia',
    'Punto de venta e inventario de farmacia: sucursales, lotes FEFO, asistencia y reportes.',
    'Sistema de punto de venta e inventario para farmacia, hecho con Next.js y Supabase. Cubre el inventario por sucursal, lotes con rotación FEFO, asistencia y reportes.',
    'https://github.com/ESPACEX88/Farmacia',
    'https://farmacia-tan-two.vercel.app',
    array['Next.js', 'Supabase', 'TypeScript', 'Tailwind'],
    1,
    true
  ),
  (
    'b2222222-2222-4222-8222-222222222222',
    'Comunión',
    'comunion',
    'App para leer la Biblia en dúo, con auth, versículos y preview en Expo.',
    'Aplicación móvil y espiritual en Expo y React Native: autenticación, versículos y lectura compartida. No hay una URL web pública; el avance se abre con Expo Go mediante un preview de EAS.',
    'https://github.com/ESPACEX88/comunion',
    null,
    array['Expo', 'React Native', 'TypeScript', 'Supabase'],
    2,
    true
  ),
  (
    'c3333333-3333-4333-8333-333333333333',
    'Space Manager',
    'space-manager',
    'Administración y control de espacios físicos para instituciones académicas.',
    'Proyecto de titulación (UAPT). Sistema en Laravel para la administración y el control de espacios físicos en instituciones académicas.',
    'https://github.com/ESPACEX88/space-manager',
    null,
    array['Laravel', 'PHP', 'Vue.js'],
    3,
    true
  )
on conflict (slug) do nothing;
