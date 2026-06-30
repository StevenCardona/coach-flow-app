import type { Role } from "../../../types";

export interface RegisterInput {
  role: Role;
  name: string;
  email: string;
}

export interface RegisterCoachResponse {
  user: unknown;
  coach: unknown;
}

export interface RegisterStudentResponse {
  user: unknown;
  student: unknown;
}

export type RegisterResponse = RegisterCoachResponse | RegisterStudentResponse;
