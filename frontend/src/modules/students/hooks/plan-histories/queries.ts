"use client";

import { useQuery } from "@tanstack/react-query";

import { getPlanHistories } from "../../apis/plan-histories";
import { planHistoryKeys } from "./keys";

export function usePlanHistoriesQuery(
  studentId: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: planHistoryKeys.list(studentId),
    queryFn: () => getPlanHistories(studentId),
    enabled: (options?.enabled ?? true) && !!studentId,
  });
}
