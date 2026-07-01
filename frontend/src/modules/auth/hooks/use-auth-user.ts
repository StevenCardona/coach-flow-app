"use client";

import { useAuthContext } from "@/providers/auth-provider";

import { useCurrentUserQuery } from "./queries";

export function useAuthUser() {
  const { isAuthenticated: hasToken } = useAuthContext();
  const query = useCurrentUserQuery({
    enabled: hasToken,
    retry: false,
  });

  return {
    isLoading: hasToken && query.isPending,
    isAuthenticated: hasToken && query.isSuccess,
    isError: hasToken && query.isError,
    user: query.data ?? null,
    mustChangePassword: query.data?.mustChangePassword ?? false,
    query,
  };
}
