"use client";

import { usePathname, useRouter } from "next/navigation";

import type { ReactNode } from "react";

import { useEffect } from "react";

import { CfSkeleton } from "@/components/cf";

import { Role } from "@/lib/types/entities";

import { coachOnlyRoutePrefixes } from "@/layouts/config/navigation";

import { hasAccessToken } from "@/lib/auth/token-storage";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";
import { useAuthContext } from "@/providers/auth-provider";

import { AppFooter } from "./components/app-footer";

import { AppHeader } from "./components/app-header";

import { AppSidebar } from "./components/app-sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthContext();
  const { isLoading, isError, user, mustChangePassword } = useAuthUser();

  useEffect(() => {
    if (!isLoading && isError && hasAccessToken()) {
      logout();
      const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(pathname)}`;
      window.location.assign(signInUrl);
    }
  }, [isLoading, isError, logout, pathname]);

  useEffect(() => {
    if (!isLoading && mustChangePassword) {
      router.replace("/change-password");
    }
  }, [isLoading, mustChangePassword, router]);

  useEffect(() => {
    if (!user || user.role !== Role.STUDENT) return;

    if (!user.student?.onboardingCompleted) {
      router.replace("/onboarding");
      return;
    }

    const isCoachOnlyRoute = coachOnlyRoutePrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    );

    if (isCoachOnlyRoute) {
      router.replace("/dashboard");
    }
  }, [pathname, router, user]);

  if (isLoading || isError || mustChangePassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <CfSkeleton className="h-64 w-full max-w-2xl" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
