"use client";

import type { Control } from "react-hook-form";

import { FormField, FormSection } from "@/components/cf";

import type { BodyMeasurementsFormInput } from "../schemas/body-measurements.schema";

interface BodyMeasurementsFormFieldsProps {
  control: Control<BodyMeasurementsFormInput>;
  microStep: number;
  disabled?: boolean;
}

export function BodyMeasurementsFormFields({
  control,
  microStep,
  disabled,
}: BodyMeasurementsFormFieldsProps) {
  if (microStep === 0) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="weightKg"
            label="Peso (kg)"
            type="number"
            placeholder="70"
            required
            disabled={disabled}
          />
          <FormField
            control={control}
            name="heightCm"
            label="Altura (cm)"
            type="number"
            placeholder="175"
            required
            disabled={disabled}
          />
        </div>
        <FormField
          control={control}
          name="measuredAt"
          label="Fecha de medición"
          type="date"
          description="Usa la fecha en que tomaste estas medidas."
          required
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <FormSection
      title="Medidas opcionales"
      description="Puedes completarlas ahora o más adelante con tu coach."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="chestCm"
          label="Pecho (cm)"
          type="number"
          disabled={disabled}
        />
        <FormField
          control={control}
          name="waistCm"
          label="Cintura (cm)"
          type="number"
          disabled={disabled}
        />
        <FormField
          control={control}
          name="hipCm"
          label="Cadera (cm)"
          type="number"
          disabled={disabled}
        />
        <FormField
          control={control}
          name="armCm"
          label="Brazo (cm)"
          type="number"
          disabled={disabled}
        />
        <FormField
          control={control}
          name="bicepCm"
          label="Bíceps (cm)"
          type="number"
          disabled={disabled}
        />
      </div>
    </FormSection>
  );
}
