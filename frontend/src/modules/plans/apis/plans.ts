import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type { Plan } from "@/lib/types/entities";

import type { CreatePlanRequest, UpdatePlanRequest } from "../types/requests";

export async function createPlan(body: CreatePlanRequest) {
  return unwrapResponse(api.post<ApiResponse<Plan>>("/plans", body));
}

export async function getPlans(params?: { active?: boolean }) {
  return unwrapResponse(
    api.get<ApiResponse<Plan[]>>("/plans", {
      params: params?.active !== undefined ? { active: String(params.active) } : undefined,
    }),
  );
}

export async function getPlanById(id: string) {
  return unwrapResponse(api.get<ApiResponse<Plan>>(`/plans/${id}`));
}

export async function updatePlan(id: string, body: UpdatePlanRequest) {
  return unwrapResponse(api.patch<ApiResponse<Plan>>(`/plans/${id}`, body));
}

export async function deletePlan(id: string) {
  return unwrapResponse(api.delete<ApiResponse<Plan>>(`/plans/${id}`));
}
