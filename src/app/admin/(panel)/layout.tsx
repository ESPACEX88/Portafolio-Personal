import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { email } = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Panel</p>
            <p className="font-display text-lg font-semibold">Proyectos</p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <Link href="/admin" className="text-slate-300 hover:text-white">
              Lista
            </Link>
            <Link href="/admin/projects/new" className="text-slate-300 hover:text-white">
              Nuevo
            </Link>
            <Link href="/#projects" className="text-slate-300 hover:text-white">
              Ver sitio
            </Link>
            <form action={logout}>
              <button type="submit" className="text-slate-500 hover:text-white">
                Salir
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-8">
        <p className="mb-6 text-xs text-slate-500">{email}</p>
        {children}
      </div>
    </div>
  );
}
