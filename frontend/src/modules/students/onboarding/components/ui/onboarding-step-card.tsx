"use client";

import type { ReactNode } from "react";

import { Title } from "@/components/cf";
import { cn } from "@/lib/utils";

export interface OnboardingStepCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function OnboardingStepCard({
  title,
  description,
  children,
  className,
}: OnboardingStepCardProps) {
  return (
    <div
      className={cn(
        "card-enter rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8",
        className,
      )}
    >
      <div className="mb-6 space-y-2">
        <Title as="h2" size="page">
          {title}
        </Title>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
