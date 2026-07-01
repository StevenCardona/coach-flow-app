"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export interface OnboardingSavingIndicatorProps {
  message?: string;
  className?: string;
}

export function OnboardingSavingIndicator({
  message = "Guardando tu progreso...",
  className,
}: OnboardingSavingIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg bg-muted/60 px-4 py-3 text-sm text-muted-foreground",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="size-4 animate-spin" aria-hidden />
      {message}
    </div>
  );
}
