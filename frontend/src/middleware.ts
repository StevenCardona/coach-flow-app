import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

import { resolvePostAuthPath } from "@/lib/auth/post-auth-redirect";
import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/token-storage";
import { Role, type Role as RoleType } from "@/lib/types/entities";

const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[middleware] JWT_SECRET is not set — authenticated routes will not work.",
      );
    }

    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );

    return payload;
  } catch {
    return null;
  }
}

function getRoleFromPayload(payload: Record<string, unknown>): RoleType {
  return payload.role === Role.STUDENT ? Role.STUDENT : Role.COACH;
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const token = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const payload = token ? await verifyToken(token) : null;
  const isAuthenticated = Boolean(payload);
  const role = payload
    ? getRoleFromPayload(payload as Record<string, unknown>)
    : Role.COACH;
  const mustChangePassword = payload?.mustChangePassword === true;

  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (!isAuthenticated && !isPublicRoute(pathname)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && isPublicRoute(pathname)) {
    const redirectUrl = searchParams.get("redirect_url");
    const destination = resolvePostAuthPath({
      role,
      mustChangePassword,
      redirectUrl,
    });

    return NextResponse.redirect(new URL(destination, req.url));
  }

  if (isAuthenticated && pathname !== "/change-password") {
    if (mustChangePassword) {
      return NextResponse.redirect(new URL("/change-password", req.url));
    }
  }

  if (pathname === "/change-password" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
