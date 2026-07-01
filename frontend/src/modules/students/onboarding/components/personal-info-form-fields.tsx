"use client";

import type { Control } from "react-hook-form";

import { FormField } from "@/components/cf";
import { Gender } from "@/lib/types/entities";

import { OnboardingOptionCard } from "./ui/onboarding-option-card";
import {
  genderIcons,
  genderLabels,
} from "../utils/onboarding-labels";
import type { PersonalInfoFormValues } from "../schemas/personal-info.schema";

interface PersonalInfoFormFieldsProps {
  control: Control<PersonalInfoFormValues>;
  microStep: number;
  disabled?: boolean;
  onGenderSelect: (gender: Gender) => void;
  selectedGender: Gender;
}

export function PersonalInfoFormFields({
  control,
  microStep,
  disabled,
  onGenderSelect,
  selectedGender,
}: PersonalInfoFormFieldsProps) {
  if (microStep === 0) {
    return (
      <FormField
        control={control}
        name="phoneNumber"
        label="Número de teléfono"
        type="tel"
        placeholder="+57 300 123 4567"
        description="Tu coach podrá contactarte por este número."
        required
        disabled={disabled}
      />
    );
  }

  if (microStep === 1) {
    return (
      <div className="space-y-6">
        <FormField
          control={control}
          name="birthday"
          label="Fecha de nacimiento"
          type="date"
          required
          disabled={disabled}
        />
        <div className="space-y-3">
          <p className="text-sm font-medium">
            Género <span className="text-destructive">*</span>
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {Object.values(Gender).map((gender) => (
              <OnboardingOptionCard
                key={gender}
                label={genderLabels[gender]}
                icon={genderIcons[gender]}
                selected={selectedGender === gender}
                onSelect={() => onGenderSelect(gender)}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="medicalCondition"
        label="Condición médica relevante"
        type="textarea"
        placeholder="Alergias, lesiones, restricciones..."
        description="Opcional. Comparte solo lo que consideres importante."
        disabled={disabled}
      />
      <FormField
        control={control}
        name="observations"
        label="Observaciones adicionales"
        type="textarea"
        placeholder="Algo más que debamos saber..."
        disabled={disabled}
      />
    </div>
  );
}
