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

export interface CreateInvitationAuditInput {
  coachId: string;
  studentId: string;
  email: string;
  clerkInvitationId: string;
  expiresAt: Date;
}
