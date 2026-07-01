"use client";

import * as React from "react";

import { FormFieldGroup } from "@/components/cf/forms/form-field-group";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

function parseCurrencyDigits(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (!digits) {
    return 0;
  }

  return Number(digits);
}

function formatCurrencyDisplay(amount: number): string {
  if (!amount) {
    return "";
  }

  return formatCurrency(amount);
}

export interface CurrencyInputProps {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function CurrencyInput({
  id,
  value,
  onChange,
  label,
  placeholder = "$ 0",
  description,
  error,
  required,
  disabled,
  className,
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const displayValue = isFocused
    ? draft
    : value > 0
      ? formatCurrencyDisplay(value)
      : "";

  const handleFocus = () => {
    setIsFocused(true);
    setDraft(value > 0 ? String(value) : "");
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseCurrencyDigits(draft);
    onChange(parsed);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextDraft = event.target.value.replace(/\D/g, "");
    setDraft(nextDraft);
    onChange(nextDraft ? Number(nextDraft) : 0);
  };

  const input = (
    <Input
      id={id}
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      disabled={disabled}
      value={displayValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      aria-invalid={!!error}
      className={className}
    />
  );

  if (!label) {
    return input;
  }

  return (
    <FormFieldGroup
      label={label}
      htmlFor={id}
      error={error}
      description={description}
      required={required}
      className={cn(className)}
    >
      {input}
    </FormFieldGroup>
  );
}
