import { z } from "zod";

const positiveAmount = z
  .union([z.number(), z.string()])
  .transform((value) => Number(value))
  .pipe(
    z
      .number()
      .positive("El monto debe ser mayor a cero")
      .max(99999999.99, "El monto es demasiado alto"),
  );

const positiveDuration = z
  .union([z.number(), z.string()])
  .transform((value) => Number(value))
  .pipe(
    z
      .number()
      .int("La duración debe ser un número entero")
      .positive("La duración debe ser mayor a cero"),
  );

export const createPlanFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres"),
  description: z.string().optional(),
  amount: positiveAmount,
  durationDays: positiveDuration,
  isVirtual: z.boolean(),
});

export const editPlanFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres"),
  description: z.string().optional(),
  amount: positiveAmount,
  durationDays: positiveDuration,
  isVirtual: z.boolean(),
  isActive: z.boolean(),
});

export type CreatePlanFormInput = z.input<typeof createPlanFormSchema>;
export type CreatePlanFormValues = z.output<typeof createPlanFormSchema>;
export type EditPlanFormInput = z.input<typeof editPlanFormSchema>;
export type EditPlanFormValues = z.output<typeof editPlanFormSchema>;

export const createPlanDefaultValues: CreatePlanFormInput = {
  name: "",
  description: "",
  amount: 0,
  durationDays: 30,
  isVirtual: false,
};

export const editPlanDefaultValues: EditPlanFormInput = {
  name: "",
  description: "",
  amount: 0,
  durationDays: 30,
  isVirtual: false,
  isActive: true,
};
