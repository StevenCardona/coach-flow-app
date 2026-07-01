"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import type { FitnessGoal } from "@/lib/types/entities";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";

import { FitnessGoalsFormFields } from "./fitness-goals-form-fields";
import { OnboardingNav } from "./ui/onboarding-nav";
import { OnboardingStepCard } from "./ui/onboarding-step-card";
import {
  useCreateFitnessGoalMutation,
  useUpdateFitnessGoalMutation,
} from "../hooks/mutations";
import {
  fitnessGoalsDefaultValues,
  fitnessGoalsFormSchema,
  type FitnessGoalsFormInput,
  type FitnessGoalsFormValues,
} from "../schemas/fitness-goals.schema";
import {
  mapFitnessGoalToCreateRequest,
  mapFitnessGoalToForm,
  mapFitnessGoalToUpdateRequest,
} from "../utils/onboarding-form.utils";

const MICRO_STEP_TITLES = [
  {
    title: "¿Cuál es tu meta principal?",
    description: "Elige el objetivo que mejor describe lo que buscas.",
  },
  {
    title: "Tu disponibilidad",
    description: "Cuéntanos cuánto tiempo y presupuesto puedes dedicar.",
  },
  {
    title: "¿Dónde entrenas?",
    description: "Esto nos ayuda a diseñar rutinas adaptadas a tu entorno.",
  },
] as const;

const MICRO_STEP_FIELDS: (keyof FitnessGoalsFormInput)[][] = [
  ["trainingGoal"],
  ["weeklyTrainingHours", "budgetForNutrition"],
  ["hasGymAccess", "trainsFromHome", "additionalInfo"],
];

function normalizeBudgetValue(
  value: FitnessGoalsFormInput["budgetForNutrition"],
): number {
  if (value == null || value === "") {
    return 0;
  }

  return Number(value) || 0;
}

interface FitnessGoalsStepProps {
  initialData?: FitnessGoal | null;
  onComplete?: () => void;
}

export function FitnessGoalsStep({
  initialData,
  onComplete,
}: FitnessGoalsStepProps) {
  const router = useRouter();
  const [microStep, setMicroStep] = useState(0);
  const createMutation = useCreateFitnessGoalMutation();
  const updateMutation = useUpdateFitnessGoalMutation();
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const hasExisting = Boolean(initialData);

  const form = useForm<FitnessGoalsFormInput, unknown, FitnessGoalsFormValues>({
    resolver: zodResolver(fitnessGoalsFormSchema),
    defaultValues: fitnessGoalsDefaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      form.reset(mapFitnessGoalToForm(initialData));
    }
  }, [form, initialData]);

  const stepMeta = MICRO_STEP_TITLES[microStep];
  const isLastMicroStep = microStep === MICRO_STEP_TITLES.length - 1;

  const validateMicroStep = async () => {
    const fields = MICRO_STEP_FIELDS[microStep];
    return form.trigger(fields);
  };

  const handleContinue = async () => {
    const isValid = await validateMicroStep();

    if (!isValid) {
      return;
    }

    if (!isLastMicroStep) {
      setMicroStep((prev) => prev + 1);
      return;
    }

    const parseResult = fitnessGoalsFormSchema.safeParse(form.getValues());

    if (!parseResult.success) {
      return;
    }

    const values = parseResult.data;

    if (hasExisting) {
      updateMutation.mutate(mapFitnessGoalToUpdateRequest(values), {
        onSuccess: () => {
          toast.success("¡Onboarding completado!");
          onComplete?.();
          router.replace("/dashboard");
        },
        onError: (error) => {
          toast.error("No se pudieron guardar tus objetivos", {
            description: getApiErrorMessage(error),
          });
        },
      });
      return;
    }

    createMutation.mutate(mapFitnessGoalToCreateRequest(values), {
      onSuccess: () => {
        toast.success("¡Onboarding completado!");
        onComplete?.();
        router.replace("/dashboard");
      },
      onError: (error) => {
        toast.error("No se pudieron guardar tus objetivos", {
          description: getApiErrorMessage(error),
        });
      },
    });
  };

  const handleBack = () => {
    if (microStep > 0) {
      setMicroStep((prev) => prev - 1);
    }
  };

  return (
    <Form {...form}>
      <OnboardingStepCard
        title={stepMeta.title}
        description={stepMeta.description}
      >
        <FitnessGoalsFormFields
          control={form.control}
          microStep={microStep}
          disabled={isSaving}
          selectedTrainingGoal={form.watch("trainingGoal")}
          onTrainingGoalSelect={(goal) =>
            form.setValue("trainingGoal", goal, { shouldValidate: true })
          }
          budgetValue={normalizeBudgetValue(form.watch("budgetForNutrition"))}
          onBudgetChange={(value) =>
            form.setValue("budgetForNutrition", value > 0 ? value : null, {
              shouldValidate: true,
            })
          }
        />
      </OnboardingStepCard>

      <div className="mt-6">
        <OnboardingNav
          onBack={handleBack}
          onContinue={handleContinue}
          showBack={microStep > 0}
          isSaving={isSaving}
          continueLabel={isLastMicroStep ? "Finalizar" : "Continuar"}
        />
      </div>
    </Form>
  );
}
