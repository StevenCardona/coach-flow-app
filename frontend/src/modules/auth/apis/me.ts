import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type { CurrentUser } from "@/lib/types/entities";

export async function getCurrentUser() {
  return unwrapResponse(api.get<ApiResponse<CurrentUser>>("/me"));
}
