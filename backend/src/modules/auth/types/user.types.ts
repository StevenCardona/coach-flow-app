import type { Role } from "../../../types";

export interface CreateUserInput {
  clerkId: string;
  email: string;
  name: string;
  role: Role;
}
