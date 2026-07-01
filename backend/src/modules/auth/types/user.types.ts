import type { Role } from "../../../types";

export interface CreateUserInput {
  email: string;
  name: string;
  passwordHash: string;
  mustChangePassword?: boolean;
  role: Role;
}
