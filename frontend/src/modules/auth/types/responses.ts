import type { User } from "@/lib/types/entities";

export interface AuthSessionResponse {
  user: User;
  token: string;
  mustChangePassword: boolean;
}

export interface ChangePasswordResponse {
  user: User;
  token: string;
  mustChangePassword: boolean;
}
