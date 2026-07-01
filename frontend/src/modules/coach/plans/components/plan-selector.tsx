"use client";

import * as React from "react";

import { FormFieldGroup } from "@/components/cf/forms/form-field-group";
import { formatCurrency } from "@/lib/format";
import type { Plan } from "@/lib/types/entities";

import { PlanCombobox, type PlanComboboxOption } from "./ui/plan-combobox";
import { usePlansQuery } from "../hooks/queries";

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

function formatPlanLabel(plan: Plan): string {
  const amount = formatCurrency(Number(plan.amount));
  return `${plan.name} — ${amount} · ${plan.durationDays} días`;
}

function planToOption(plan: Plan): PlanComboboxOption {
  return {
    value: plan.id,
    label: formatPlanLabel(plan),
  };
}

export interface PlanSelectorProps {
  value: string | null;
  onValueChange: (planId: string | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  selectedPlanLabel?: string | null;
  id?: string;
}

export function PlanSelector({
  value,
  onValueChange,
  label = "Plan",
  placeholder = "Buscar y seleccionar plan...",
  disabled,
  error,
  required,
  selectedPlanLabel,
  id = "plan-selector",
}: PlanSelectorProps) {
  const [searchInput, setSearchInput] = React.useState("");
  const isFilteringRef = React.useRef(false);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const plansQuery = usePlansQuery({
    isActive: true,
    search: debouncedSearch.trim() || undefined,
    pageSize: 50,
    sortBy: "name",
    sortOrder: "asc",
  });

  const options = React.useMemo(
    () => (plansQuery.data?.items ?? []).map(planToOption),
    [plansQuery.data?.items],
  );

  const selectedOption = React.useMemo(() => {
    if (!value) {
      return null;
    }

    const fromList = options.find((option) => option.value === value);
    if (fromList) {
      return fromList;
    }

    if (selectedPlanLabel) {
      return { value, label: selectedPlanLabel };
    }

    return { value, label: "Plan seleccionado" };
  }, [options, selectedPlanLabel, value]);

  React.useEffect(() => {
    if (isFilteringRef.current) {
      return;
    }

    if (selectedOption) {
      setSearchInput(selectedOption.label);
      return;
    }

    if (!value) {
      setSearchInput("");
    }
  }, [selectedOption, value]);

  const handleInputChange = (nextInput: string) => {
    isFilteringRef.current = true;
    setSearchInput(nextInput);
  };

  const handleInputFocus = () => {
    isFilteringRef.current = true;
  };

  const handleInputBlur = () => {
    isFilteringRef.current = false;

    if (selectedOption) {
      setSearchInput(selectedOption.label);
      return;
    }

    setSearchInput("");
  };

  const handleValueChange = (option: PlanComboboxOption | null) => {
    onValueChange(option?.value ?? null);
    isFilteringRef.current = false;

    if (option) {
      setSearchInput(option.label);
      return;
    }

    setSearchInput("");
  };

  const description = selectedPlanLabel
    ? `Plan activo: ${selectedPlanLabel}. Opcional. Solo se muestran planes activos.`
    : "Opcional. Solo se muestran planes activos.";

  return (
    <FormFieldGroup
      label={label}
      htmlFor={id}
      error={error}
      required={required}
      description={description}
    >
      <PlanCombobox
        id={id}
        options={options}
        value={selectedOption}
        onValueChange={handleValueChange}
        inputValue={searchInput}
        onInputValueChange={handleInputChange}
        onInputFocus={handleInputFocus}
        onInputBlur={handleInputBlur}
        placeholder={placeholder}
        disabled={disabled}
        loading={plansQuery.isLoading}
        aria-invalid={!!error}
      />
    </FormFieldGroup>
  );
}
