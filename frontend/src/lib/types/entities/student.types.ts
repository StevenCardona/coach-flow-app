import type { Gender } from "./enums";
import type { Timestamps } from "./common";
import type { User } from "./user.types";

export interface Student extends Timestamps {
  id: string;
  userId: string;
  coachId: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  birthday: string | null;
  gender: Gender | null;
  observations: string | null;
  medicalCondition: string | null;
  personalInfoCompleted: boolean;
  onboardingCompleted: boolean;
  isActive: boolean;
  streamChannelId: string | null;
}

export interface CreateStudentCredentials {
  email: string;
  initialPassword: string;
  message: string;
}

export interface CreateStudentResponse {
  user: Pick<User, "id" | "email" | "name" | "role" | "mustChangePassword" | "isActive">;
  student: Pick<Student, "id" | "userId" | "coachId" | "name" | "email">;
  credentials: CreateStudentCredentials;
}

export interface DeactivateStudentResponse {
  studentId: string;
  message: string;
}

export interface DeleteStudentResponse {
  studentId: string;
  message: string;
}

export interface StudentListItemActivePlan {
  id: string;
  name: string;
}

export interface StudentListItem extends Student {
  activePlan: StudentListItemActivePlan | null;
}

export type StudentDetail = StudentListItem;

export interface StudentsStats {
  total: number;
  active: number;
  inactive: number;
  withActivePlan: number;
  withoutActivePlan: number;
  planDistribution: {
    planId: string;
    planName: string;
    studentCount: number;
  }[];
}

export type UpdateStudentResponse = Student;
