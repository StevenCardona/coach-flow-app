import { Eye, Pencil, Trash2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CardActionVariant = "edit" | "delete" | "view" | "custom";

const defaultLabels: Record<Exclude<CardActionVariant, "custom">, string> = {
  edit: "Editar",
  delete: "Eliminar",
  view: "Ver",
};

const defaultIcons: Record<Exclude<CardActionVariant, "custom">, React.ReactNode> = {
  edit: <Pencil className="size-4" />,
  delete: <Trash2 className="size-4" />,
  view: <Eye className="size-4" />,
};

export interface CardActionButtonProps {
  variant: CardActionVariant;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function CardActionButton({
  variant,
  label,
  icon,
  onClick,
  disabled,
  loading,
}: CardActionButtonProps) {
  const resolvedLabel =
    label ?? (variant !== "custom" ? defaultLabels[variant] : "Acción");
  const resolvedIcon =
    icon ?? (variant !== "custom" ? defaultIcons[variant] : null);

  return (
    <Button
      type="button"
      variant={variant === "delete" ? "ghost" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(variant === "delete" && "text-destructive hover:text-destructive")}
    >
      {resolvedIcon}
      {resolvedLabel}
    </Button>
  );
}

export interface CardActionsProps {
  actions: CardActionButtonProps[];
  className?: string;
}

export function CardActions({ actions, className }: CardActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {actions.map((action, index) => (
        <CardActionButton key={`${action.variant}-${index}`} {...action} />
      ))}
    </div>
  );
}
