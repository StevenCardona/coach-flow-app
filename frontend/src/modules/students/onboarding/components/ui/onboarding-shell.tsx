"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface OnboardingShellProps {
  progress: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function OnboardingShell({
  progress,
  children,
  footer,
  className,
}: OnboardingShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/30">
      <header className="border-b border-border/60 bg-background/80 px-4 py-4 backdrop-blur-sm lg:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Coach Flow
            </p>
            <h1 className="text-lg font-semibold tracking-tight">
              Configura tu perfil
            </h1>
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-3xl">{progress}</div>
      </header>

      <main
        className={cn(
          "flex flex-1 flex-col items-center justify-center px-4 py-8 lg:px-8",
          className,
        )}
      >
        <div className="w-full max-w-xl">{children}</div>
      </main>

      {footer ? (
        <footer className="border-t border-border/60 bg-background/80 px-4 py-4 backdrop-blur-sm lg:px-8">
          <div className="mx-auto max-w-xl">{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
