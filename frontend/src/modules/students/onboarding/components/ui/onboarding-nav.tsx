"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface OnboardingNavProps {
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  backLabel?: string;
  isBackDisabled?: boolean;
  isContinueDisabled?: boolean;
  isSaving?: boolean;
  showBack?: boolean;
}

export function OnboardingNav({
  onBack,
  onContinue,
  continueLabel = "Continuar",
  backLabel = "Atrás",
  isBackDisabled,
  isContinueDisabled,
  isSaving,
  showBack = true,
}: OnboardingNavProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {showBack && onBack ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isBackDisabled || isSaving}
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Button>
      ) : (
        <div />
      )}

      <Button
        type="button"
        onClick={onContinue}
        disabled={isContinueDisabled || isSaving}
        className="min-w-32"
      >
        {isSaving ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            {continueLabel}
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </div>
  );
}
