import { z } from "zod";

export const createPlanSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(2000).optional().nullable(),
  amount: z
    .number()
    .positive("El monto debe ser mayor a cero")
    .max(99999999.99),
  durationDays: z
    .number()
    .int("La duración debe ser un número entero")
    .positive("La duración debe ser mayor a cero"),
  isVirtual: z.boolean(),
});

export const updatePlanSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  description: z.string().trim().max(2000).optional().nullable(),
  amount: z
    .number()
    .positive("El monto debe ser mayor a cero")
    .max(99999999.99)
    .optional(),
  durationDays: z
    .number()
    .int("La duración debe ser un número entero")
    .positive("La duración debe ser mayor a cero")
    .optional(),
  isVirtual: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type CreatePlanBody = z.infer<typeof createPlanSchema>;
export type UpdatePlanBody = z.infer<typeof updatePlanSchema>;
