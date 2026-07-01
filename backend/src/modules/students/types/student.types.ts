import type { Gender } from "../../../types";

export interface CreateStudentInput {
  userId: string;
  coachId: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  observations?: string | null;
  medicalCondition?: string | null;
}

export interface CreateStudentByCoachInput {
  name: string;
  email: string;
  phoneNumber?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  observations?: string | null;
  medicalCondition?: string | null;
}

export interface UpdateStudentByCoachInput {
  name?: string;
  phoneNumber?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  observations?: string | null;
  medicalCondition?: string | null;
}

export interface StudentListItemActivePlan {
  id: string;
  name: string;
}

export interface StudentListItem {
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
  created_at: string;
  updated_at: string;
  activePlan: StudentListItemActivePlan | null;
}

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

export interface CreateStudentCredentials {
  email: string;
  initialPassword: string;
  message: string;
}

export interface CreateStudentByCoachResult {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    mustChangePassword: boolean;
    isActive: boolean;
  };
  student: {
    id: string;
    userId: string;
    coachId: string;
    name: string;
    email: string;
  };
  credentials: CreateStudentCredentials;
}
