import type { Gender, InvitationStatus } from "./enums";
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

export interface Invitation extends Timestamps {
  id: string;
  coachId: string;
  studentId: string | null;
  email: string;
  token: string | null;
  clerkInvitationId: string | null;
  status: InvitationStatus;
  expiresAt: string;
}

export interface CreateStudentResponse {
  user: User;
  student: Student;
  invitation: Invitation;
  clerkSynced: boolean;
}

export interface DeactivateStudentResponse {
  studentId: string;
  clerkSynced: boolean;
  message: string;
}

export interface DeleteStudentResponse {
  studentId: string;
  clerkDeleted: boolean;
  invitationsRevoked: number;
  message: string;
}
