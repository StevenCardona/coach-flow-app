import { z } from "zod";

const dateOnlySchema = z
  .string()
  .min(1, "La fecha es obligatoria")
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (AAAA-MM-DD)");

const requiredMeasurement = z
  .union([z.number(), z.string()])
  .transform((value) => Number(value))
  .pipe(
    z
      .number()
      .positive("El valor debe ser mayor a cero")
      .max(9999.99, "El valor es demasiado alto"),
  );

const optionalMeasurement = z
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
      .positive("El valor debe ser mayor a cero")
      .max(9999.99, "El valor es demasiado alto")
      .nullable(),
  );

export const bodyMeasurementsFormSchema = z.object({
  weightKg: requiredMeasurement,
  heightCm: requiredMeasurement,
  measuredAt: dateOnlySchema,
  chestCm: optionalMeasurement,
  waistCm: optionalMeasurement,
  hipCm: optionalMeasurement,
  armCm: optionalMeasurement,
  bicepCm: optionalMeasurement,
});

export type BodyMeasurementsFormInput = z.input<typeof bodyMeasurementsFormSchema>;
export type BodyMeasurementsFormValues = z.output<typeof bodyMeasurementsFormSchema>;

export const bodyMeasurementsDefaultValues: BodyMeasurementsFormInput = {
  weightKg: 0,
  heightCm: 0,
  measuredAt: new Date().toISOString().slice(0, 10),
  chestCm: null,
  waistCm: null,
  hipCm: null,
  armCm: null,
  bicepCm: null,
};
