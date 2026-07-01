import { isAxiosError } from "axios";

import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type { FitnessGoal } from "@/lib/types/entities";

import type {
  CreateFitnessGoalRequest,
  UpdateFitnessGoalRequest,
} from "../types/requests";

const BASE = "/me/onboarding/fitness-goals";

export async function createFitnessGoal(body: CreateFitnessGoalRequest) {
  return unwrapResponse(api.post<ApiResponse<FitnessGoal>>(BASE, body));
}

export async function updateFitnessGoal(body: UpdateFitnessGoalRequest) {
  return unwrapResponse(api.put<ApiResponse<FitnessGoal>>(BASE, body));
}

export async function getFitnessGoal(): Promise<FitnessGoal | null> {
  try {
    return await unwrapResponse(api.get<ApiResponse<FitnessGoal>>(BASE));
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}
