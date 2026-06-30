import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type { User } from "@/lib/types/entities";

export async function getCurrentUser() {
  return unwrapResponse(api.get<ApiResponse<User>>("/me"));
}
