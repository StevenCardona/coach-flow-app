import type { Role } from "@/lib/types/entities";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  role: Role;
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
