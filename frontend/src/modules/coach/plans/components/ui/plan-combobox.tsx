"use client";

import { Combobox } from "@base-ui/react/combobox";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface PlanComboboxOption {
  value: string;
  label: string;
}

export interface PlanComboboxProps {
  options: PlanComboboxOption[];
  value: PlanComboboxOption | null;
  onValueChange: (option: PlanComboboxOption | null) => void;
  onInputValueChange?: (value: string) => void;
  inputValue?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  id?: string;
  "aria-invalid"?: boolean;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
}

export function PlanCombobox({
  options,
  value,
  onValueChange,
  onInputValueChange,
  inputValue,
  placeholder = "Buscar plan...",
  disabled,
  loading,
  emptyMessage = "No se encontraron planes",
  id,
  "aria-invalid": ariaInvalid,
  onInputFocus,
  onInputBlur,
}: PlanComboboxProps) {
  return (
    <Combobox.Root
      items={options}
      value={value}
      onValueChange={(nextValue) => {
        onValueChange(nextValue);
      }}
      onInputValueChange={(nextInputValue) => {
        onInputValueChange?.(nextInputValue);
      }}
      inputValue={inputValue}
      isItemEqualToValue={(item, selected) => item.value === selected.value}
      itemToStringLabel={(item) => item.label}
      disabled={disabled}
    >
      <Combobox.InputGroup
        className={cn(
          "flex h-8 w-full items-center gap-1 rounded-lg border border-input bg-transparent px-2.5 text-sm transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          ariaInvalid && "border-destructive ring-3 ring-destructive/20",
          "dark:bg-input/30",
        )}
      >
        <Combobox.Input
          id={id}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          aria-invalid={ariaInvalid}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        {value ? (
          <Combobox.Clear
            className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Limpiar selección"
          >
            <XIcon className="size-3.5" />
          </Combobox.Clear>
        ) : null}
        <Combobox.Trigger
          className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground"
          aria-label="Abrir lista de planes"
        >
          <ChevronDownIcon className="size-4" />
        </Combobox.Trigger>
      </Combobox.InputGroup>

      <Combobox.Portal>
        <Combobox.Positioner className="z-50" sideOffset={4}>
          <Combobox.Popup
            className={cn(
              "max-h-72 w-[var(--anchor-width)] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md",
              "origin-[var(--transform-origin)]",
            )}
          >
            {loading ? (
              <p className="px-2 py-3 text-sm text-muted-foreground">
                Cargando planes...
              </p>
            ) : (
              <>
                <Combobox.Empty className="px-2 py-3 text-sm text-muted-foreground">
                  {emptyMessage}
                </Combobox.Empty>
                <Combobox.List className="max-h-64 overflow-y-auto p-0.5">
                  {(option: PlanComboboxOption) => (
                    <Combobox.Item
                      key={option.value}
                      value={option}
                      className={cn(
                        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
                        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
                        "data-selected:font-medium",
                      )}
                    >
                      <Combobox.ItemIndicator className="flex size-4 items-center justify-center">
                        <CheckIcon className="size-3.5" />
                      </Combobox.ItemIndicator>
                      <span className="flex-1 truncate">{option.label}</span>
                    </Combobox.Item>
                  )}
                </Combobox.List>
              </>
            )}
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
