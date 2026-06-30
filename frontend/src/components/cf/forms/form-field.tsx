"use client";

import * as React from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { FormFieldGroup } from "@/components/cf/forms/form-field-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type FormFieldType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "password"
  | "textarea"
  | "select"
  | "checkbox"
  | "date";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  type?: FormFieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options?: FormFieldOption[];
}

export function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  description,
  required,
  disabled,
  options = [],
}: FormFieldProps<TFieldValues>) {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {type === "checkbox" ? (
            <div className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
              <FormLabel className="!mt-0">{label}</FormLabel>
            </div>
          ) : (
            <>
              <FormLabel>
                {label}
                {required && <span className="text-destructive"> *</span>}
              </FormLabel>
              <FormControl>
                {type === "textarea" ? (
                  <Textarea
                    placeholder={placeholder}
                    disabled={disabled}
                    {...field}
                    value={field.value ?? ""}
                  />
                ) : type === "select" ? (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    disabled={disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={placeholder ?? "Seleccionar"} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...field}
                    value={field.value ?? ""}
                  />
                )}
              </FormControl>
            </>
          )}
          {description && type !== "checkbox" && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export interface StandaloneFormFieldProps {
  id: string;
  label: string;
  type?: FormFieldType;
  value?: string | number | boolean;
  onChange?: (value: string | boolean | null) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  options?: FormFieldOption[];
}

export function StandaloneFormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  description,
  error,
  required,
  disabled,
  options = [],
}: StandaloneFormFieldProps) {
  return (
    <FormFieldGroup
      label={type === "checkbox" ? undefined : label}
      htmlFor={id}
      error={error}
      description={description}
      required={required}
    >
      {type === "checkbox" ? (
        <div className="flex items-center gap-2">
          <Checkbox
            id={id}
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange?.(Boolean(checked))}
            disabled={disabled}
          />
          <label htmlFor={id} className="text-sm font-medium">
            {label}
          </label>
        </div>
      ) : type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          value={String(value ?? "")}
          onChange={(event) => onChange?.(event.target.value)}
          aria-invalid={!!error}
        />
      ) : type === "select" ? (
        <Select
          value={String(value ?? "")}
          onValueChange={(nextValue) => onChange?.(nextValue ?? null)}
          disabled={disabled}
        >
          <SelectTrigger id={id} className="w-full" aria-invalid={!!error}>
            <SelectValue placeholder={placeholder ?? "Seleccionar"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={typeof value === "boolean" ? "" : (value ?? "")}
          onChange={(event) => onChange?.(event.target.value)}
          aria-invalid={!!error}
        />
      )}
    </FormFieldGroup>
  );
}
