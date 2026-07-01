"use client";

import type { Control, FieldValues } from "react-hook-form";

import { FormField, FormSection, StandaloneFormField } from "@/components/cf";
import { Gender } from "@/lib/types/entities";

interface StudentFormFieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  mode: "create" | "edit";
  email?: string;
}

export function StudentFormFields<TFieldValues extends FieldValues>({
  control,
  mode,
  email,
}: StudentFormFieldsProps<TFieldValues>) {
  return (
    <>
      <FormSection title="Datos personales">
        <FormField
          control={control}
          name={"name" as never}
          label="Nombre completo"
          type="text"
          required
        />
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
      </FormSection>
      <FormSection title="Información adicional">
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
      </FormSection>
    </>
  );
}
