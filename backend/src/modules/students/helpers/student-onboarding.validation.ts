import { z } from "zod";

import { Gender, TrainingGoal } from "../../../types";

const dateOnlySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)");

const decimalMeasurementSchema = z
  .number()
  .positive("El valor debe ser mayor a cero")
  .max(9999.99);

const optionalDecimalMeasurementSchema = z
  .number()
  .positive("El valor debe ser mayor a cero")
  .max(9999.99)
  .optional()
  .nullable();

export const createPersonalInfoSchema = z.object({
  phoneNumber: z.string().trim().min(5).max(30),
  birthday: dateOnlySchema,
  gender: z.enum(Object.values(Gender) as [string, ...string[]]),
  observations: z.string().trim().max(2000).optional().nullable(),
  medicalCondition: z.string().trim().max(2000).optional().nullable(),
});

export const updatePersonalInfoSchema = z
  .object({
    phoneNumber: z.string().trim().min(5).max(30).optional().nullable(),
    birthday: dateOnlySchema.optional().nullable(),
    gender: z
      .enum(Object.values(Gender) as [string, ...string[]])
      .optional()
      .nullable(),
    observations: z.string().trim().max(2000).optional().nullable(),
    medicalCondition: z.string().trim().max(2000).optional().nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo para actualizar",
  });

export const createBodyMeasurementSchema = z.object({
  weightKg: decimalMeasurementSchema,
  heightCm: decimalMeasurementSchema,
  measuredAt: dateOnlySchema,
  chestCm: optionalDecimalMeasurementSchema,
  waistCm: optionalDecimalMeasurementSchema,
  hipCm: optionalDecimalMeasurementSchema,
  armCm: optionalDecimalMeasurementSchema,
  bicepCm: optionalDecimalMeasurementSchema,
});

export const updateBodyMeasurementSchema = z
  .object({
    weightKg: decimalMeasurementSchema.optional(),
    heightCm: decimalMeasurementSchema.optional(),
    measuredAt: dateOnlySchema.optional(),
    chestCm: optionalDecimalMeasurementSchema,
    waistCm: optionalDecimalMeasurementSchema,
    hipCm: optionalDecimalMeasurementSchema,
    armCm: optionalDecimalMeasurementSchema,
    bicepCm: optionalDecimalMeasurementSchema,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo para actualizar",
  });

export const createFitnessGoalSchema = z.object({
  trainingGoal: z.enum(Object.values(TrainingGoal) as [string, ...string[]]),
  weeklyTrainingHours: z
    .number()
    .int("Las horas deben ser un número entero")
    .positive("Las horas deben ser mayor a cero")
    .max(168),
  budgetForNutrition: z
    .number()
    .nonnegative("El presupuesto no puede ser negativo")
    .max(99999999.99)
    .optional()
    .nullable(),
  hasGymAccess: z.boolean(),
  trainsFromHome: z.boolean(),
  additionalInfo: z.string().trim().max(2000).optional().nullable(),
});

export const updateFitnessGoalSchema = z
  .object({
    trainingGoal: z
      .enum(Object.values(TrainingGoal) as [string, ...string[]])
      .optional(),
    weeklyTrainingHours: z
      .number()
      .int("Las horas deben ser un número entero")
      .positive("Las horas deben ser mayor a cero")
      .max(168)
      .optional(),
    budgetForNutrition: z
      .number()
      .nonnegative("El presupuesto no puede ser negativo")
      .max(99999999.99)
      .optional()
      .nullable(),
    hasGymAccess: z.boolean().optional(),
    trainsFromHome: z.boolean().optional(),
    additionalInfo: z.string().trim().max(2000).optional().nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo para actualizar",
  });

export type CreatePersonalInfoBody = z.infer<typeof createPersonalInfoSchema>;
export type UpdatePersonalInfoBody = z.infer<typeof updatePersonalInfoSchema>;
export type CreateBodyMeasurementBody = z.infer<typeof createBodyMeasurementSchema>;
export type UpdateBodyMeasurementBody = z.infer<typeof updateBodyMeasurementSchema>;
export type CreateFitnessGoalBody = z.infer<typeof createFitnessGoalSchema>;
export type UpdateFitnessGoalBody = z.infer<typeof updateFitnessGoalSchema>;
