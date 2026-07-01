"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  ONBOARDING_PHASES,
  type OnboardingPhaseId,
} from "../../utils/onboarding-labels";

export interface OnboardingProgressProps {
  currentPhase: OnboardingPhaseId;
  completedPhases: OnboardingPhaseId[];
  progressPercent: number;
}

export function OnboardingProgress({
  currentPhase,
  completedPhases,
  progressPercent,
}: OnboardingProgressProps) {
  return (
    <div className="space-y-4">
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="progress-bar h-full rounded-full bg-primary"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <ol className="grid grid-cols-3 gap-2">
        {ONBOARDING_PHASES.map((phase, index) => {
          const isCompleted = completedPhases.includes(phase.id);
          const isCurrent = phase.id === currentPhase;
          const Icon = phase.icon;

          return (
            <li
              key={phase.id}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-center transition-colors",
                isCurrent && "bg-primary/10",
                isCompleted && !isCurrent && "opacity-80",
              )}
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 transition-colors",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary bg-background text-primary"
                      : "border-muted-foreground/30 bg-background text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" aria-hidden />
                ) : (
                  <Icon className="size-4" aria-hidden />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium leading-tight",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {phase.label}
              </span>
              <span className="sr-only">
                Paso {index + 1} de {ONBOARDING_PHASES.length}: {phase.label}
                {isCompleted ? ", completado" : isCurrent ? ", actual" : ""}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
