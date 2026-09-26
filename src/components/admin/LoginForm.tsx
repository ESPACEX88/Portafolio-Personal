"use client";

import { useActionState } from "react";
import { loginWithPassword, sendMagicLink, type FormState } from "@/app/admin/actions";

const fieldClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500";

function SubmitButton({
  pending,
  children,
  variant = "primary",
}: {
  pending: boolean;
  children: string;
  variant?: "primary" | "ghost";
}) {
  const primary = variant === "primary";
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        primary
          ? "w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-800"
          : "w-full rounded-lg border border-slate-700 py-2.5 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {pending ? "Espera…" : children}
    </button>
  );
}

function Feedback({ state }: { state: FormState | null }) {
  if (!state?.error && !state?.message) return null;
  const error = Boolean(state.error);
  return (
    <p
      className={
        error
          ? "rounded-lg border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300"
          : "rounded-lg border border-emerald-900 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-300"
      }
      role={error ? "alert" : "status"}
    >
      {state.error ?? state.message}
    </p>
  );
}

export function LoginForm() {
  const [passwordState, passwordAction, passwordPending] = useActionState(loginWithPassword, null);
  const [magicState, magicAction, magicPending] = useActionState(sendMagicLink, null);

  return (
    <div className="space-y-8">
      <form action={passwordAction} className="space-y-4">
        <label className="block space-y-1.5 text-sm">
          <span className="text-slate-300">Correo</span>
          <input name="email" type="email" autoComplete="username" required className={fieldClass} />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="text-slate-300">Contraseña</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={fieldClass}
          />
        </label>
        <Feedback state={passwordState} />
        <SubmitButton pending={passwordPending}>Entrar</SubmitButton>
      </form>

      <form action={magicAction} className="space-y-4 border-t border-slate-800 pt-6">
        <p className="text-sm text-slate-400">O pide un enlace mágico al correo de administración.</p>
        <label className="block space-y-1.5 text-sm">
          <span className="text-slate-300">Correo</span>
          <input name="email" type="email" autoComplete="email" required className={fieldClass} />
        </label>
        <Feedback state={magicState} />
        <SubmitButton pending={magicPending} variant="ghost">
          Enviar enlace
        </SubmitButton>
      </form>
    </div>
  );
}
