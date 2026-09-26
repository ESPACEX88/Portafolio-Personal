/** Mantén este correo alineado con private.is_portfolio_admin() en la migración. */
export const ADMIN_EMAIL = "posadasjosep8@gmail.com";

export function isAdminEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() === ADMIN_EMAIL;
}
