import { Role, type Role as RoleType } from "@/lib/types/entities";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/change-password"];

export function sanitizeRedirectUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  const trimmed = url.trim();

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return null;
  }

  if (trimmed.includes("://") || trimmed.includes("\\")) {
    return null;
  }

  if (PUBLIC_ROUTES.some((route) => trimmed === route || trimmed.startsWith(`${route}/`))) {
    return null;
  }

  return trimmed;
}

export function getDefaultHomeForRole(role: RoleType): string {
  return role === Role.STUDENT ? "/dashboard" : "/dashboard";
}

export function resolvePostAuthPath({
  role,
  mustChangePassword,
  redirectUrl,
}: {
  role: RoleType;
  mustChangePassword: boolean;
  redirectUrl?: string | null;
}): string {
  if (mustChangePassword) {
    return "/change-password";
  }

  const sanitized = sanitizeRedirectUrl(redirectUrl);

  if (sanitized) {
    return sanitized === "/" ? getDefaultHomeForRole(role) : sanitized;
  }

  return getDefaultHomeForRole(role);
}
