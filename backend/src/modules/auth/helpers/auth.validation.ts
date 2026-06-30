import { z } from "zod";

export const registerCoachSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
});

export type RegisterCoachBody = z.infer<typeof registerCoachSchema>;
