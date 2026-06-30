import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type { StudentPlanHistory } from "@/lib/types/entities";

import type { AssignPlanRequest } from "../types/requests";

export async function assignPlan(studentId: string, body: AssignPlanRequest) {
  return unwrapResponse(
    api.post<ApiResponse<StudentPlanHistory>>(
      `/students/${studentId}/plan-histories`,
      body,
    ),
  );
}

export async function getPlanHistories(studentId: string) {
  return unwrapResponse(
    api.get<ApiResponse<StudentPlanHistory[]>>(
      `/students/${studentId}/plan-histories`,
    ),
  );
}
