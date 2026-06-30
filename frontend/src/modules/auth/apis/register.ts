import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";

import type { RegisterRequest } from "../types/requests";
import type { RegisterResponse } from "../types/responses";

export async function registerUser(body: RegisterRequest) {
  return unwrapResponse(
    api.post<ApiResponse<RegisterResponse>>("/auth/register", body),
  );
}
