"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { assignPlan } from "../../apis/plan-histories";
import type { AssignPlanRequest } from "../../types/requests";
import { planHistoryKeys } from "./keys";

export function useAssignPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      body,
    }: {
      studentId: string;
      body: AssignPlanRequest;
    }) => assignPlan(studentId, body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: planHistoryKeys.list(variables.studentId),
      });
    },
  });
}
