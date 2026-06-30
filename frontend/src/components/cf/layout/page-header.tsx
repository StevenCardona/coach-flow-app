import { ChevronRight, type LucideIcon } from "lucide-react";
import * as React from "react";

import { Title } from "@/components/cf/layout/title";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  showChevron?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  showChevron = true,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {Icon ? (
            <Icon className="size-5" strokeWidth={1.75} />
          ) : showChevron ? (
            <ChevronRight className="size-5" strokeWidth={1.75} />
          ) : null}
        </div>
        <div className="space-y-1">
          <Title as="h1" size="page">
            {title}
          </Title>
          {subtitle && (
            <p className="text-body-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
