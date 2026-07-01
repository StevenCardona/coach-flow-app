"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";
import type { PersonalInfoResponse } from "@/lib/types/entities";

import { PersonalInfoFormFields } from "./personal-info-form-fields";
import { OnboardingNav } from "./ui/onboarding-nav";
import { OnboardingStepCard } from "./ui/onboarding-step-card";
import {
  useCreatePersonalInfoMutation,
  useUpdatePersonalInfoMutation,
} from "../hooks/mutations";
import {
  personalInfoDefaultValues,
  personalInfoFormSchema,
  type PersonalInfoFormValues,
} from "../schemas/personal-info.schema";
import {
  mapPersonalInfoToCreateRequest,
  mapPersonalInfoToUpdateRequest,
  mapPersonalInfoToForm,
} from "../utils/onboarding-form.utils";

const MICRO_STEP_TITLES = [
  {
    title: "¿Cómo podemos contactarte?",
    description: "Necesitamos tu número de teléfono para coordinar contigo.",
  },
  {
    title: "Cuéntanos sobre ti",
    description: "Esta información nos ayuda a personalizar tu experiencia.",
  },
  {
    title: "Salud y observaciones",
    description: "Comparte detalles relevantes para tu entrenamiento.",
  },
] as const;

const MICRO_STEP_FIELDS: (keyof PersonalInfoFormValues)[][] = [
  ["phoneNumber"],
  ["birthday", "gender"],
  ["medicalCondition", "observations"],
];

interface PersonalInfoStepProps {
  initialData?: PersonalInfoResponse | null;
  isCompleted: boolean;
  onComplete: () => void;
}

export function PersonalInfoStep({
  initialData,
  isCompleted,
  onComplete,
}: PersonalInfoStepProps) {
  const [microStep, setMicroStep] = useState(0);
  const createMutation = useCreatePersonalInfoMutation();
  const updateMutation = useUpdatePersonalInfoMutation();
  const isSaving = createMutation.isPending || updateMutation.isPending;

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: personalInfoDefaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      form.reset(mapPersonalInfoToForm(initialData));
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

    const parseResult = personalInfoFormSchema.safeParse(form.getValues());

    if (!parseResult.success) {
      return;
    }

    const values = parseResult.data;

    if (isCompleted) {
      updateMutation.mutate(mapPersonalInfoToUpdateRequest(values), {
        onSuccess: () => {
          toast.success("Información personal guardada");
          onComplete();
        },
        onError: (error) => {
          toast.error("No se pudo guardar la información", {
            description: getApiErrorMessage(error),
          });
        },
      });
      return;
    }

    createMutation.mutate(mapPersonalInfoToCreateRequest(values), {
      onSuccess: () => {
        toast.success("Información personal guardada");
        onComplete();
      },
      onError: (error) => {
        toast.error("No se pudo guardar la información", {
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
        <PersonalInfoFormFields
          control={form.control}
          microStep={microStep}
          disabled={isSaving}
          selectedGender={form.watch("gender")}
          onGenderSelect={(gender) =>
            form.setValue("gender", gender, { shouldValidate: true })
          }
        />
      </OnboardingStepCard>

      <div className="mt-6">
        <OnboardingNav
          onBack={handleBack}
          onContinue={handleContinue}
          showBack={microStep > 0}
          isSaving={isSaving}
          continueLabel={isLastMicroStep ? "Guardar y continuar" : "Continuar"}
        />
      </div>
    </Form>
  );
}
