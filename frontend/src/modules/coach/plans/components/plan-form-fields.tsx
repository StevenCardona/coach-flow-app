"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { CurrencyInput, FormField, FormSection } from "@/components/cf";
import {
  FormControl,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PlanFormFieldsProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  mode: "create" | "edit";
}

export function PlanFormFields<TFieldValues extends FieldValues>({
  control,
  mode,
}: PlanFormFieldsProps<TFieldValues>) {
  return (
    <FormSection title="Información del plan">
      <FormField
        control={control}
        name={"name" as never}
        label="Nombre"
        type="text"
        required
      />
      <FormField
        control={control}
        name={"description" as never}
        label="Descripción"
        type="textarea"
        placeholder="Describe el plan (opcional)"
      />
      <ShadcnFormField
        control={control}
        name={"amount" as FieldPath<TFieldValues>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Monto
              <span className="text-destructive"> *</span>
            </FormLabel>
            <FormControl>
              <CurrencyInput
                value={Number(field.value) || 0}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={"durationDays" as never}
        label="Duración (días)"
        type="number"
        required
        placeholder="30"
      />
      <FormField
        control={control}
        name={"isVirtual" as never}
        label="Plan virtual"
        type="checkbox"
        description="Marca si el plan se imparte de forma virtual."
      />
      {mode === "edit" ? (
        <FormField
          control={control}
          name={"isActive" as never}
          label="Plan activo"
          type="checkbox"
          description="Los planes inactivos no pueden asignarse a nuevos alumnos."
        />
      ) : null}
    </FormSection>
  );
}
