import { cache } from "react";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const getAdminSession = cache(async () => {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error) return null;

  const email = data?.claims.email;
  if (typeof email !== "string" || !isAdminEmail(email)) return null;

  return { supabase, email: email.trim().toLowerCase() };
});

export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login?error=config");
  }

  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
