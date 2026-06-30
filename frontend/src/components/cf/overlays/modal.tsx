"use client";

import { Loader2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CfModalSize = "sm" | "md" | "lg";

const sizeClasses: Record<CfModalSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
};

export interface CfModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: CfModalSize;
  loading?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function CfModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  loading = false,
  showCloseButton = true,
  className,
}: CfModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (loading) {
          return;
        }
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        showCloseButton={showCloseButton && !loading}
        className={cn(sizeClasses[size], "p-0", className)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <DialogBody>{children}</DialogBody>}
        {footer && (
          <DialogFooter>
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Guardando...
              </div>
            ) : (
              footer
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export interface CfModalActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: React.ComponentProps<typeof Button>["variant"];
  loading?: boolean;
  disabled?: boolean;
}

export function CfModalActions({
  onCancel,
  onConfirm,
  cancelLabel = "Cancelar",
  confirmLabel = "Guardar",
  confirmVariant = "default",
  loading,
  disabled,
}: CfModalActionsProps) {
  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading || disabled}
      >
        {cancelLabel}
      </Button>
      <Button
        type="button"
        variant={confirmVariant}
        onClick={onConfirm}
        disabled={loading || disabled}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {confirmLabel}
      </Button>
    </>
  );
}
