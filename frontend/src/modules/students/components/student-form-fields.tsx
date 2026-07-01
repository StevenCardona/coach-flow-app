"use client";

import type { Control, FieldValues } from "react-hook-form";

import { FormField, StandaloneFormField } from "@/components/cf";
import { PlanSelector } from "@/modules/coach/plans";
import { Gender } from "@/lib/types/entities";

interface StudentFieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  mode: "create" | "edit";
  email?: string;
  planId?: string | null;
  onPlanIdChange?: (planId: string | null) => void;
  selectedPlanLabel?: string | null;
  planError?: string;
}

export function StudentPersonalFields<TFieldValues extends FieldValues>({
  control,
  mode,
  email,
  planId,
  onPlanIdChange,
  selectedPlanLabel,
  planError,
}: StudentFieldsProps<TFieldValues>) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name={"name" as never}
          label="Nombre completo"
          type="text"
          required
        />
        {onPlanIdChange ? (
          <PlanSelector
            value={planId ?? null}
            onValueChange={onPlanIdChange}
            label="Plan"
            selectedPlanLabel={selectedPlanLabel}
            error={planError}
          />
        ) : null}
      </div>

      {mode === "create" ? (
        <FormField
          control={control}
          name={"email" as never}
          label="Correo electrónico"
          type="email"
          required
        />
      ) : (
        <StandaloneFormField
          id="student-email-readonly"
          label="Correo electrónico"
          type="email"
          value={email ?? ""}
          disabled
          description="El correo no se puede cambiar después de crear el alumno."
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField
          control={control}
          name={"phoneNumber" as never}
          label="Teléfono"
          type="tel"
        />
        <FormField
          control={control}
          name={"birthday" as never}
          label="Fecha de nacimiento"
          type="date"
        />
        <FormField
          control={control}
          name={"gender" as never}
          label="Género"
          type="select"
          options={[
            { label: "Masculino", value: Gender.MALE },
            { label: "Femenino", value: Gender.FEMALE },
            { label: "Otro", value: Gender.OTHER },
          ]}
        />
      </div>
    </div>
  );
}

export function StudentAdditionalFields<TFieldValues extends FieldValues>({
  control,
}: Pick<StudentFieldsProps<TFieldValues>, "control">) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={"observations" as never}
        label="Observaciones"
        type="textarea"
      />
      <FormField
        control={control}
        name={"medicalCondition" as never}
        label="Condición médica"
        type="textarea"
      />
    </div>
  );
}

/** @deprecated Use StudentPersonalFields and StudentAdditionalFields with CfTabs in modals */
export function StudentFormFields<TFieldValues extends FieldValues>({
  control,
  mode,
  email,
  planId,
  onPlanIdChange,
  selectedPlanLabel,
  planError,
}: StudentFieldsProps<TFieldValues>) {
  return (
    <>
      <StudentPersonalFields
        control={control}
        mode={mode}
        email={email}
        planId={planId}
        onPlanIdChange={onPlanIdChange}
        selectedPlanLabel={selectedPlanLabel}
        planError={planError}
      />
      <StudentAdditionalFields control={control} />
    </>
  );
}
