import type { Gender } from "@/lib/types/entities";

export interface CreateStudentRequest {
  name: string;
  email: string;
  phoneNumber?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  observations?: string | null;
  medicalCondition?: string | null;
}

export interface AssignPlanRequest {
  planId: string;
  startDate: string;
  endDate?: string | null;
  notes?: string | null;
}

export interface UpdateStudentRequest {
  name?: string;
  phoneNumber?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  observations?: string | null;
  medicalCondition?: string | null;
}
