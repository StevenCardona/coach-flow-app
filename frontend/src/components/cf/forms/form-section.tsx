import * as React from "react";

import { Section } from "@/components/cf/layout/section";
import { cn } from "@/lib/utils";

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: FormSectionProps) {
  return (
    <Section
      title={title}
      description={description}
      className={cn("rounded-lg border border-border bg-card p-4", className)}
      {...props}
    >
      <div className="grid gap-4">{children}</div>
    </Section>
  );
}
