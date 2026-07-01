"use client";

import * as React from "react";

import { CfSkeleton, DataTable, QueryState } from "@/components/cf";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  PlanHistoryStatus,
  type StudentPlanHistory,
} from "@/lib/types/entities";

import { usePlanHistoriesQuery } from "../hooks/plan-histories/queries";

type HistoryStatusFilter = "all" | PlanHistoryStatus;

interface PlanHistoryRow {
  id: string;
  planName: string;
  planAmount: string;
  startDate: string;
  endDate: string | null;
  status: PlanHistoryStatus;
  notes: string | null;
  searchText: string;
}

const statusLabels: Record<PlanHistoryStatus, string> = {
  ACTIVE: "Activo",
  EXPIRED: "Expirado",
  CANCELLED: "Cancelado",
};

const statusVariants: Record<
  PlanHistoryStatus,
  "default" | "secondary" | "outline"
> = {
  ACTIVE: "default",
  EXPIRED: "secondary",
  CANCELLED: "outline",
};

function mapHistoryToRow(history: StudentPlanHistory): PlanHistoryRow {
  const planName = history.plan?.name ?? "Plan eliminado";
  const notes = history.notes ?? "";
  const planAmount = history.plan
    ? formatCurrency(Number(history.plan.amount))
    : "—";

  return {
    id: history.id,
    planName,
    planAmount,
    startDate: history.startDate,
    endDate: history.endDate,
    status: history.status,
    notes: notes || null,
    searchText: `${planName} ${notes}`.trim(),
  };
}

function truncateNotes(notes: string | null, maxLength = 60) {
  if (!notes) {
    return "—";
  }

  return notes.length > maxLength ? `${notes.slice(0, maxLength)}…` : notes;
}

export interface StudentPlanHistoryListProps {
  studentId: string;
  enabled?: boolean;
}

export function StudentPlanHistoryList({
  studentId,
  enabled = true,
}: StudentPlanHistoryListProps) {
  const [statusFilter, setStatusFilter] =
    React.useState<HistoryStatusFilter>("all");

  const historiesQuery = usePlanHistoriesQuery(studentId, { enabled });

  const rows = React.useMemo(() => {
    const items = historiesQuery.data ?? [];
    const mapped = items.map(mapHistoryToRow);

    if (statusFilter === "all") {
      return mapped;
    }

    return mapped.filter((row) => row.status === statusFilter);
  }, [historiesQuery.data, statusFilter]);

  return (
    <QueryState
      query={historiesQuery}
      skeleton={<CfSkeleton variant="table" rows={4} />}
      errorTitle="No pudimos cargar el historial de planes"
    >
      {() => (
        <div className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as HistoryStatusFilter)
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value={PlanHistoryStatus.ACTIVE}>Activo</SelectItem>
                <SelectItem value={PlanHistoryStatus.EXPIRED}>Expirado</SelectItem>
                <SelectItem value={PlanHistoryStatus.CANCELLED}>
                  Cancelado
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable<PlanHistoryRow>
            mode="client"
            data={rows}
            searchKeys={["planName", "notes", "searchText"]}
            searchPlaceholder="Buscar por plan o notas..."
            emptyMessage="Este alumno aún no tiene planes asignados"
            getRowKey={(row) => row.id}
            columns={[
              { key: "planName", header: "Plan" },
              { key: "planAmount", header: "Monto" },
              {
                key: "startDate",
                header: "Inicio",
                render: (row) => formatDate(row.startDate),
              },
              {
                key: "endDate",
                header: "Fin",
                render: (row) => formatDate(row.endDate),
              },
              {
                key: "status",
                header: "Estado",
                render: (row) => (
                  <Badge variant={statusVariants[row.status]}>
                    {statusLabels[row.status]}
                  </Badge>
                ),
              },
              {
                key: "notes",
                header: "Notas",
                render: (row) => truncateNotes(row.notes),
              },
            ]}
          />
        </div>
      )}
    </QueryState>
  );
}
