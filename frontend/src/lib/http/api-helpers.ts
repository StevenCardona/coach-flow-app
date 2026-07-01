import { isAxiosError } from "axios";

import type { ApiErrorResponse, ApiResponse } from "@/lib/types/api.types";

export async function unwrapResponse<T>(
  promise: Promise<{ data: ApiResponse<T> }>,
): Promise<T> {
  const { data } = await promise;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    data.success === false &&
    "message" in data &&
    typeof data.message === "string"
  );
}

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.response?.status === 500) {
      return "Ocurrió un error en el servidor. Intenta de nuevo más tarde.";
    }

    const responseData = error.response?.data;

    if (isApiErrorResponse(responseData)) {
      return responseData.message;
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
}
