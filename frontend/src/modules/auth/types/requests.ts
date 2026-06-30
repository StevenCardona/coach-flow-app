import type { Role } from "@/lib/types/entities";

export interface RegisterRequest {
  role: Role;
  name: string;
  email: string;
}
