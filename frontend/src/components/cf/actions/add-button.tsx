import { Loader2, Plus } from "lucide-react";
import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AddButtonProps extends Omit<ButtonProps, "children"> {
  label?: string;
  loading?: boolean;
}

export function AddButton({
  label = "Agregar",
  loading = false,
  disabled,
  className,
  ...props
}: AddButtonProps) {
  return (
    <Button
      type="button"
      variant="default"
      disabled={disabled || loading}
      className={cn(className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Plus className="size-4" />
      )}
      {label}
    </Button>
  );
}
