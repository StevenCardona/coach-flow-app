"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { PaginationParams } from "@/lib/types/pagination.types";

import { getPlanById, getPlans } from "../apis/plans";
import { planKeys } from "./keys";

export function usePlansQuery(
  params?: PaginationParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: planKeys.list(params),
    queryFn: () => getPlans(params),
    placeholderData: keepPreviousData,
    enabled: options?.enabled ?? true,
  });
}

export function usePlanQuery(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: planKeys.detail(id),
    queryFn: () => getPlanById(id),
    enabled: (options?.enabled ?? true) && !!id,
  });
}
