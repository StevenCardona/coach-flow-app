"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import type { BodyMeasurement } from "@/lib/types/entities";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";

import { BodyMeasurementsFormFields } from "./body-measurements-form-fields";
import { OnboardingNav } from "./ui/onboarding-nav";
import { OnboardingStepCard } from "./ui/onboarding-step-card";
import {
  useCreateBodyMeasurementMutation,
  useUpdateBodyMeasurementMutation,
} from "../hooks/mutations";
import {
  bodyMeasurementsDefaultValues,
  bodyMeasurementsFormSchema,
  type BodyMeasurementsFormInput,
  type BodyMeasurementsFormValues,
} from "../schemas/body-measurements.schema";
import {
  mapBodyMeasurementToCreateRequest,
  mapBodyMeasurementToForm,
  mapBodyMeasurementToUpdateRequest,
} from "../utils/onboarding-form.utils";

const MICRO_STEP_TITLES = [
  {
    title: "Tus medidas básicas",
    description: "Registra tu peso, altura y la fecha de la medición.",
  },
  {
    title: "Medidas adicionales",
    description: "Opcional: agrega más detalles de tu composición corporal.",
  },
] as const;

const MICRO_STEP_FIELDS: (keyof BodyMeasurementsFormInput)[][] = [
  ["weightKg", "heightCm", "measuredAt"],
  ["chestCm", "waistCm", "hipCm", "armCm", "bicepCm"],
];

interface BodyMeasurementsStepProps {
  existingMeasurement?: BodyMeasurement | null;
  onComplete: () => void;
}

export function BodyMeasurementsStep({
  existingMeasurement,
  onComplete,
}: BodyMeasurementsStepProps) {
  const [microStep, setMicroStep] = useState(0);
  const createMutation = useCreateBodyMeasurementMutation();
  const updateMutation = useUpdateBodyMeasurementMutation();
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const hasExisting = Boolean(existingMeasurement);

  const form = useForm<BodyMeasurementsFormInput, unknown, BodyMeasurementsFormValues>({
    resolver: zodResolver(bodyMeasurementsFormSchema),
    defaultValues: bodyMeasurementsDefaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (existingMeasurement) {
      form.reset(mapBodyMeasurementToForm(existingMeasurement));
    }
  }, [existingMeasurement, form]);

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

    const parseResult = bodyMeasurementsFormSchema.safeParse(form.getValues());

    if (!parseResult.success) {
      return;
    }

    const values = parseResult.data;

    if (hasExisting && existingMeasurement) {
      updateMutation.mutate(
        {
          id: existingMeasurement.id,
          body: mapBodyMeasurementToUpdateRequest(values),
        },
        {
          onSuccess: () => {
            toast.success("Medidas corporales guardadas");
            onComplete();
          },
          onError: (error) => {
            toast.error("No se pudieron guardar las medidas", {
              description: getApiErrorMessage(error),
            });
          },
        },
      );
      return;
    }

    createMutation.mutate(mapBodyMeasurementToCreateRequest(values), {
      onSuccess: () => {
        toast.success("Medidas corporales guardadas");
        onComplete();
      },
      onError: (error) => {
        toast.error("No se pudieron guardar las medidas", {
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
        <BodyMeasurementsFormFields
          control={form.control}
          microStep={microStep}
          disabled={isSaving}
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
