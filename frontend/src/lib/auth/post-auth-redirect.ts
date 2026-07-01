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

export function getDefaultHomeForRole(
  role: RoleType,
  onboardingCompleted = true,
): string {
  if (role === Role.STUDENT && !onboardingCompleted) {
    return "/onboarding";
  }

  return "/dashboard";
}

export function resolvePostAuthPath({
  role,
  mustChangePassword,
  redirectUrl,
  onboardingCompleted = true,
}: {
  role: RoleType;
  mustChangePassword: boolean;
  redirectUrl?: string | null;
  onboardingCompleted?: boolean;
}): string {
  if (mustChangePassword) {
    return "/change-password";
  }

  const sanitized = sanitizeRedirectUrl(redirectUrl);

  if (sanitized) {
    if (role === Role.STUDENT && !onboardingCompleted) {
      return "/onboarding";
    }

    return sanitized === "/"
      ? getDefaultHomeForRole(role, onboardingCompleted)
      : sanitized;
  }

  return getDefaultHomeForRole(role, onboardingCompleted);
}
