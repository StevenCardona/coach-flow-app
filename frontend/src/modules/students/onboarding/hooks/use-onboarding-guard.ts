"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Role } from "@/lib/types/entities";
import { hasAccessToken } from "@/lib/auth/token-storage";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";

interface UseOnboardingGuardOptions {
  mode: "require-incomplete" | "require-complete";
}

export function useOnboardingGuard({ mode }: UseOnboardingGuardOptions) {
  const router = useRouter();
  const { user, isLoading, isError } = useAuthUser();

  const isStudent = user?.role === Role.STUDENT;
  const onboardingCompleted = user?.student?.onboardingCompleted ?? false;

  useEffect(() => {
    if (isLoading) return;

    if (!hasAccessToken() || isError) {
      router.replace("/sign-in?redirect_url=%2Fonboarding");
      return;
    }

    if (!user) return;

    if (!isStudent) {
      router.replace("/dashboard");
      return;
    }

    if (mode === "require-incomplete" && onboardingCompleted) {
      router.replace("/dashboard");
      return;
    }

    if (mode === "require-complete" && !onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [
    isError,
    isLoading,
    isStudent,
    mode,
    onboardingCompleted,
    router,
    user,
  ]);

  const shouldRender =
    !isLoading &&
    !isError &&
    Boolean(user) &&
    isStudent &&
    (mode === "require-incomplete"
      ? !onboardingCompleted
      : onboardingCompleted);

  return {
    shouldRender,
    isLoading,
    user,
    onboardingCompleted,
  };
}
