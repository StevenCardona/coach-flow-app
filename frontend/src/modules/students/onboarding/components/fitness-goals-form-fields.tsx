"use client";

import type { Control } from "react-hook-form";

import { FormField } from "@/components/cf";
import { CurrencyInput } from "@/components/cf/forms/currency-input";
import { TrainingGoal } from "@/lib/types/entities";

import { OnboardingOptionCard } from "./ui/onboarding-option-card";
import {
  trainingGoalDescriptions,
  trainingGoalIcons,
  trainingGoalLabels,
} from "../utils/onboarding-labels";
import type { FitnessGoalsFormInput } from "../schemas/fitness-goals.schema";

interface FitnessGoalsFormFieldsProps {
  control: Control<FitnessGoalsFormInput>;
  microStep: number;
  disabled?: boolean;
  onTrainingGoalSelect: (goal: TrainingGoal) => void;
  selectedTrainingGoal: TrainingGoal;
  budgetValue: number | null | undefined;
  onBudgetChange: (value: number) => void;
}

export function FitnessGoalsFormFields({
  control,
  microStep,
  disabled,
  onTrainingGoalSelect,
  selectedTrainingGoal,
  budgetValue,
  onBudgetChange,
}: FitnessGoalsFormFieldsProps) {
  if (microStep === 0) {
    return (
      <div className="grid gap-3">
        {Object.values(TrainingGoal).map((goal) => (
          <OnboardingOptionCard
            key={goal}
            label={trainingGoalLabels[goal]}
            description={trainingGoalDescriptions[goal]}
            icon={trainingGoalIcons[goal]}
            selected={selectedTrainingGoal === goal}
            onSelect={() => onTrainingGoalSelect(goal)}
            disabled={disabled}
          />
        ))}
      </div>
    );
  }

  if (microStep === 1) {
    return (
      <div className="space-y-4">
        <FormField
          control={control}
          name="weeklyTrainingHours"
          label="Horas de entrenamiento por semana"
          type="number"
          placeholder="3"
          description="¿Cuántas horas puedes dedicar al entrenamiento?"
          required
          disabled={disabled}
        />
        <CurrencyInput
          label="Presupuesto mensual para nutrición"
          description="Opcional. Ayuda a tu coach a planificar mejor."
          value={budgetValue ?? 0}
          onChange={onBudgetChange}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="hasGymAccess"
        label="Tengo acceso a un gimnasio"
        type="checkbox"
        disabled={disabled}
      />
      <FormField
        control={control}
        name="trainsFromHome"
        label="Entreno desde casa"
        type="checkbox"
        disabled={disabled}
      />
      <FormField
        control={control}
        name="additionalInfo"
        label="Información adicional"
        type="textarea"
        placeholder="Equipamiento disponible, horarios preferidos..."
        disabled={disabled}
      />
    </div>
  );
}
