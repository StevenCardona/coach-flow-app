"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Title } from "@/components/cf/layout/title";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AsidePosition = "left" | "right";
type AsideWidth = "sm" | "md" | "lg";

const widthClasses: Record<AsideWidth, string> = {
  sm: "w-64",
  md: "w-80",
  lg: "w-96",
};

export interface AsideProps {
  title?: string;
  position?: AsidePosition;
  width?: AsideWidth;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function Aside({
  title,
  position = "right",
  width = "md",
  open = true,
  onOpenChange,
  children,
  className,
}: AsideProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      {onOpenChange && (
        <button
          type="button"
          aria-label="Cerrar panel"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}
      <aside
        className={cn(
          "shrink-0 rounded-lg border border-border bg-card p-4",
          widthClasses[width],
          onOpenChange && [
            "fixed inset-y-0 z-50 overflow-y-auto shadow-lg lg:static lg:shadow-none",
            position === "right" ? "right-0" : "left-0",
          ],
          className,
        )}
      >
        {(title || onOpenChange) && (
          <div className="mb-4 flex items-center justify-between gap-2">
            {title && (
              <Title as="h3" size="card">
                {title}
              </Title>
            )}
            {onOpenChange && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => onOpenChange(false)}
                aria-label="Cerrar panel"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        )}
        {children}
      </aside>
    </>
  );
}

export interface AsideLayoutProps {
  children: React.ReactNode;
  aside: React.ReactNode;
  className?: string;
}

export function AsideLayout({ children, aside, className }: AsideLayoutProps) {
  return (
    <div className={cn("flex flex-col gap-6 lg:flex-row", className)}>
      <div className="min-w-0 flex-1">{children}</div>
      {aside}
    </div>
  );
}
