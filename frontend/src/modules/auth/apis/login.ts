import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";

import type { LoginRequest } from "../types/requests";
import type { AuthSessionResponse } from "../types/responses";

export async function loginUser(body: LoginRequest) {
  return unwrapResponse(
    api.post<ApiResponse<AuthSessionResponse>>("/auth/login", body),
  );
}
