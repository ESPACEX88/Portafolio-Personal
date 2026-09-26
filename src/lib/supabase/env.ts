export const PROJECT_PHOTOS_BUCKET = "project-photos";

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
}

export function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    ""
  );
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

export function projectPhotoUrl(storagePath: string | null | undefined) {
  if (!storagePath) return null;
  if (storagePath.startsWith("https://") || storagePath.startsWith("http://")) {
    return storagePath;
  }

  const base = getSupabaseUrl().replace(/\/$/, "");
  if (!base) return null;

  const encoded = storagePath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${base}/storage/v1/object/public/${PROJECT_PHOTOS_BUCKET}/${encoded}`;
}

export function siteOriginFromHeaders(headerStore: Headers) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  if (!host) return "http://localhost:3000";

  const proto = headerStore.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}
