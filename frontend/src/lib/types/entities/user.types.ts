import type { Role } from "./enums";
import type { Timestamps } from "./common";
import type { Student } from "./student.types";

export interface User extends Timestamps {
  id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  mustChangePassword: boolean;
  coachId?: string | null;
  studentId?: string | null;
}

export interface CurrentUser extends User {
  coach: Coach | null;
  student: Student | null;
}

export interface Coach extends Timestamps {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  isActive: boolean;
}
