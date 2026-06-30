import { z } from "zod";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)");

export const assignPlanSchema = z
  .object({
    planId: z.string().uuid("ID de plan inválido"),
    startDate: dateSchema,
    endDate: dateSchema.optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .refine(
    (data) => {
      if (!data.endDate) {
        return true;
      }

      return data.endDate >= data.startDate;
    },
    {
      message: "La fecha fin debe ser igual o posterior a la fecha inicio",
      path: ["endDate"],
    },
  );

export type AssignPlanBody = z.infer<typeof assignPlanSchema>;
