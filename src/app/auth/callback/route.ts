import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const login = new URL("/admin/login", url.origin);

  if (!isSupabaseConfigured()) {
    login.searchParams.set("error", "config");
    return NextResponse.redirect(login);
  }

  const code = url.searchParams.get("code");
  if (!code) {
    login.searchParams.set("error", "auth");
    return NextResponse.redirect(login);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    login.searchParams.set("error", "auth");
    return NextResponse.redirect(login);
  }

  const { data } = await supabase.auth.getClaims();
  const email = data?.claims.email;
  if (!isAdminEmail(typeof email === "string" ? email : null)) {
    await supabase.auth.signOut();
    login.searchParams.set("error", "forbidden");
    return NextResponse.redirect(login);
  }

  return NextResponse.redirect(new URL("/admin", url.origin));
}
