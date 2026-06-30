"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Bienvenido a Coach Flow. Has iniciado sesión correctamente.
      </p>
      <Button
        type="button"
        variant="outline"
        onClick={() => toast.success("Coach Flow listo")}
      >
        Probar notificación
      </Button>
    </div>
  );
}
