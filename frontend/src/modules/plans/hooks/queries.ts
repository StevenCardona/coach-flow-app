"use client";

import { useQuery } from "@tanstack/react-query";

import { getPlanById, getPlans } from "../apis/plans";
import { planKeys } from "./keys";

export function usePlansQuery(
  filters?: { active?: boolean },
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: planKeys.list(filters),
    queryFn: () => getPlans(filters),
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
