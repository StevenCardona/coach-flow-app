import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type { PersonalInfoResponse } from "@/lib/types/entities";

import type {
  CreatePersonalInfoRequest,
  UpdatePersonalInfoRequest,
} from "../types/requests";

const BASE = "/students/me/onboarding/personal-info";

export async function createPersonalInfo(body: CreatePersonalInfoRequest) {
  return unwrapResponse(
    api.post<ApiResponse<PersonalInfoResponse>>(BASE, body),
  );
}

export async function updatePersonalInfo(body: UpdatePersonalInfoRequest) {
  return unwrapResponse(
    api.put<ApiResponse<PersonalInfoResponse>>(BASE, body),
  );
}

export async function getPersonalInfo() {
  return unwrapResponse(api.get<ApiResponse<PersonalInfoResponse>>(BASE));
}
