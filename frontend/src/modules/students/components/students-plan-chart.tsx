"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/cf";
import type { StudentsStats } from "@/lib/types/entities";

export function StudentsPlanChart({ stats }: { stats: StudentsStats }) {
  const chartItems = [
    ...stats.planDistribution.map((item) => ({
      label: item.planName,
      value: item.studentCount,
    })),
    ...(stats.withoutActivePlan > 0
      ? [{ label: "Sin plan activo", value: stats.withoutActivePlan }]
      : []),
  ];

  const maxValue = Math.max(...chartItems.map((item) => item.value), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-body-md">Distribución por plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {chartItems.length === 0 ? (
          <p className="text-body-sm text-muted-foreground">
            Aún no hay alumnos con planes asignados.
          </p>
        ) : (
          chartItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-body-sm">
                <span>{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
