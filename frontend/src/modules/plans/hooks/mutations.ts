"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createPlan,
  deletePlan,
  updatePlan,
} from "../apis/plans";
import type { CreatePlanRequest, UpdatePlanRequest } from "../types/requests";
import { planKeys } from "./keys";

export function useCreatePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePlanRequest) => createPlan(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
    },
  });
}

export function useUpdatePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdatePlanRequest }) =>
      updatePlan(id, body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: planKeys.detail(variables.id),
      });
    },
  });
}

export function useDeletePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
      queryClient.invalidateQueries({ queryKey: planKeys.detail(id) });
    },
  });
}
