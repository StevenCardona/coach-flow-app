"use client";

import { UserCheck, UserMinus, Users } from "lucide-react";
import type { ComponentType } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CfSkeleton,
  QueryState,
} from "@/components/cf";
import type { StudentsStats } from "@/lib/types/entities";

import { StudentsPlanChart } from "./students-plan-chart";
import { useStudentsStatsQuery } from "../hooks/students/queries";

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-body-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}

function StudentsDashboardContent({ stats }: { stats: StudentsStats }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total alumnos" value={stats.total} icon={Users} />
        <StatCard title="Activos" value={stats.active} icon={UserCheck} />
        <StatCard title="Inactivos" value={stats.inactive} icon={UserMinus} />
      </div>
      <StudentsPlanChart stats={stats} />
    </div>
  );
}

export function StudentsDashboard() {
  const statsQuery = useStudentsStatsQuery();

  return (
    <QueryState
      query={statsQuery}
      skeleton={<CfSkeleton variant="metric" count={3} />}
      errorTitle="No pudimos cargar el resumen de alumnos"
    >
      {(stats) => <StudentsDashboardContent stats={stats} />}
    </QueryState>
  );
}
