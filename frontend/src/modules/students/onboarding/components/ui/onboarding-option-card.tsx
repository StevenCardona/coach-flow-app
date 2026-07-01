"use client";

import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface OnboardingOptionCardProps {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function OnboardingOptionCard({
  label,
  description,
  icon: Icon,
  selected,
  onSelect,
  disabled,
}: OnboardingOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "relative flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
        "hover:border-primary/50 hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border bg-card",
      )}
    >
      {Icon ? (
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-5" aria-hidden />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-tight">{label}</p>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {selected ? (
        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3.5" aria-hidden />
        </div>
      ) : null}
    </button>
  );
}
