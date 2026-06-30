import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type { BodyMeasurement } from "@/lib/types/entities";

import type {
  CreateBodyMeasurementRequest,
  UpdateBodyMeasurementRequest,
} from "../types/requests";

const BASE = "/students/me/onboarding/body-measurements";

export async function createBodyMeasurement(body: CreateBodyMeasurementRequest) {
  return unwrapResponse(
    api.post<ApiResponse<BodyMeasurement>>(BASE, body),
  );
}

export async function updateBodyMeasurement(
  id: string,
  body: UpdateBodyMeasurementRequest,
) {
  return unwrapResponse(
    api.put<ApiResponse<BodyMeasurement>>(`${BASE}/${id}`, body),
  );
}

export async function getBodyMeasurements() {
  return unwrapResponse(api.get<ApiResponse<BodyMeasurement[]>>(BASE));
}
