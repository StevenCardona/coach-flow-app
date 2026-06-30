import { z } from "zod";

import { Role } from "../../../types";

export const registerSchema = z.object({
  role: z.enum(Object.values(Role) as [string, ...string[]]),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
});

export type RegisterBody = z.infer<typeof registerSchema>;
