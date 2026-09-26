import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/admin-session";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

const messages: Record<string, string> = {
  config: "Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY antes de entrar.",
  forbidden: "La sesión no pertenece a la cuenta de administración.",
  auth: "El enlace no sirvió. Pide otro o entra con contraseña.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  if (isSupabaseConfigured()) {
    const session = await getAdminSession();
    if (session) redirect("/admin");
  }

  const notice = params.error ? messages[params.error] : null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-blue-400">Panel</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Entrar</h1>
      <p className="mt-2 text-sm text-slate-400">
        Solo la cuenta de administración puede crear y editar proyectos.
      </p>

      {notice ? (
        <p className="mt-6 rounded-lg border border-amber-900 bg-amber-950/40 px-3 py-2 text-sm text-amber-200" role="status">
          {notice}
        </p>
      ) : null}

      <div className="mt-8">
        {isSupabaseConfigured() ? (
          <LoginForm />
        ) : (
          <p className="text-sm leading-relaxed text-slate-400">
            Copia <code className="text-slate-200">.env.example</code> a{" "}
            <code className="text-slate-200">.env.local</code>, pega la URL y la clave anónima del
            proyecto de Supabase, y reinicia el servidor. Los pasos están en el README.
          </p>
        )}
      </div>

      <Link href="/" className="mt-10 text-sm text-slate-500 hover:text-white">
        Volver al sitio
      </Link>
    </main>
  );
}
