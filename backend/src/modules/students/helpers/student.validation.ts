import { z } from "zod";

import { Gender } from "../../../types";

export const createStudentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phoneNumber: z.string().trim().max(30).optional().nullable(),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)")
    .optional()
    .nullable(),
  gender: z.enum(Object.values(Gender) as [string, ...string[]]).optional().nullable(),
  observations: z.string().trim().max(2000).optional().nullable(),
  medicalCondition: z.string().trim().max(2000).optional().nullable(),
});

export type CreateStudentBody = z.infer<typeof createStudentSchema>;
