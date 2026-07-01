"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../apis/me";
import { authKeys } from "./keys";

export function useCurrentUserQuery(options?: {
  enabled?: boolean;
  retry?: boolean | number;
}) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getCurrentUser,
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? 1,
  });
}
