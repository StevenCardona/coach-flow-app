import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldGroupProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormFieldGroup({
  label,
  htmlFor,
  error,
  description,
  required,
  children,
  className,
}: FormFieldGroupProps) {
  const hasError = Boolean(error);

  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <Label
          htmlFor={htmlFor}
          className={cn(hasError && "text-destructive")}
        >
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      <div
        className={cn(
          hasError &&
            "[&_input]:border-destructive [&_input]:ring-destructive/20 [&_textarea]:border-destructive [&_textarea]:ring-destructive/20 [&_[data-slot=select-trigger]]:border-destructive",
        )}
      >
        {children}
      </div>
      {description && !hasError && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {hasError && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
