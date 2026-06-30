import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import type { ApiResponse } from "@/lib/types/api.types";
import type {
  CreateStudentResponse,
  DeactivateStudentResponse,
  DeleteStudentResponse,
  Student,
} from "@/lib/types/entities";

import type { CreateStudentRequest } from "../types/requests";

export async function createStudent(body: CreateStudentRequest) {
  return unwrapResponse(
    api.post<ApiResponse<CreateStudentResponse>>("/students", body),
  );
}

export async function getStudents() {
  return unwrapResponse(api.get<ApiResponse<Student[]>>("/students"));
}

export async function getStudentById(id: string) {
  return unwrapResponse(api.get<ApiResponse<Student>>(`/students/${id}`));
}

export async function deactivateStudent(id: string) {
  return unwrapResponse(
    api.patch<ApiResponse<DeactivateStudentResponse>>(
      `/students/${id}/deactivate`,
    ),
  );
}

export async function deleteStudent(id: string) {
  return unwrapResponse(
    api.delete<ApiResponse<DeleteStudentResponse>>(`/students/${id}`),
  );
}
