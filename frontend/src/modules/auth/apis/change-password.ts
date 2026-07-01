import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";

import type { ChangePasswordRequest } from "../types/requests";
import type { ChangePasswordResponse } from "../types/responses";

export async function changePassword(body: ChangePasswordRequest) {
  return unwrapResponse(
    api.post<ApiResponse<ChangePasswordResponse>>("/auth/change-password", body),
  );
}
