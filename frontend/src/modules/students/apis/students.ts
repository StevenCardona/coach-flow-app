import { api } from "@/lib/http/axios";
import { unwrapResponse } from "@/lib/http/api-helpers";
import { buildPaginationParams } from "@/lib/http/build-pagination-params";
import type { ApiResponse } from "@/lib/types/api.types";
import type {
  PaginatedResponse,
  PaginationParams,
} from "@/lib/types/pagination.types";
import type {
  CreateStudentResponse,
  DeactivateStudentResponse,
  DeleteStudentResponse,
  Student,
  StudentListItem,
  StudentsStats,
  UpdateStudentResponse,
} from "@/lib/types/entities";

import type {
  CreateStudentRequest,
  UpdateStudentRequest,
} from "../types/requests";

export async function createStudent(body: CreateStudentRequest) {
  return unwrapResponse(
    api.post<ApiResponse<CreateStudentResponse>>("/students", body),
  );
}

export async function getStudents(params?: PaginationParams) {
  return unwrapResponse(
    api.get<ApiResponse<PaginatedResponse<StudentListItem>>>("/students", {
      params: buildPaginationParams(params),
    }),
  );
}

export async function getStudentsStats() {
  return unwrapResponse(api.get<ApiResponse<StudentsStats>>("/students/stats"));
}

export async function getStudentById(id: string) {
  return unwrapResponse(api.get<ApiResponse<Student>>(`/students/${id}`));
}

export async function updateStudent(id: string, body: UpdateStudentRequest) {
  return unwrapResponse(
    api.patch<ApiResponse<UpdateStudentResponse>>(`/students/${id}`, body),
  );
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
