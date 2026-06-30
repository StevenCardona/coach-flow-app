import type { Coach, Student, User } from "@/lib/types/entities";

export interface RegisterCoachResponse {
  user: User;
  coach: Coach;
}

export interface RegisterStudentResponse {
  user: User;
  student: Student;
}

export type RegisterResponse = RegisterCoachResponse | RegisterStudentResponse;
