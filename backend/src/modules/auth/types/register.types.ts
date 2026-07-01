import type { Role } from "../../../types";

export interface RegisterInput {
  role: Role;
  name: string;
  email: string;
  password: string;
}
