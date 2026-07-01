import { z } from "zod";

import { TrainingGoal } from "@/lib/types/entities";

const positiveInt = z
  .union([z.number(), z.string()])
  .transform((value) => Number(value))
  .pipe(
    z
      .number()
      .int("Las horas deben ser un número entero")
      .positive("Las horas deben ser mayor a cero")
      .max(168, "No puede superar 168 horas por semana"),
  );

const optionalBudget = z
  .union([z.number(), z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (value === "" || value == null) {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) || parsed === 0 ? null : parsed;
  })
  .pipe(
    z
      .number()
      .nonnegative("El presupuesto no puede ser negativo")
      .max(99999999.99)
      .nullable(),
  );

export const fitnessGoalsFormSchema = z.object({
  trainingGoal: z.enum(
    [
      TrainingGoal.WEIGHT_LOSS,
      TrainingGoal.MUSCLE_GAIN,
      TrainingGoal.ENDURANCE,
      TrainingGoal.FLEXIBILITY,
      TrainingGoal.GENERAL_FITNESS,
    ],
    { message: "Selecciona una meta de entrenamiento" },
  ),
  weeklyTrainingHours: positiveInt,
  budgetForNutrition: optionalBudget,
  hasGymAccess: z.boolean(),
  trainsFromHome: z.boolean(),
  additionalInfo: z.string().trim().max(2000).optional().nullable(),
});

export type FitnessGoalsFormInput = z.input<typeof fitnessGoalsFormSchema>;
export type FitnessGoalsFormValues = z.output<typeof fitnessGoalsFormSchema>;

export const fitnessGoalsDefaultValues: FitnessGoalsFormInput = {
  trainingGoal: TrainingGoal.GENERAL_FITNESS,
  weeklyTrainingHours: 3,
  budgetForNutrition: null,
  hasGymAccess: false,
  trainsFromHome: false,
  additionalInfo: "",
};
