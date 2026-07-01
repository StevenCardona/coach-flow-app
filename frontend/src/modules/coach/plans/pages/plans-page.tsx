"use client";

import { CreditCard } from "lucide-react";
import * as React from "react";

import {
  AddButton,
  CardActions,
  CfSkeleton,
  ConfirmDialog,
  DataTable,
  PageHeader,
  QueryState,
} from "@/components/cf";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import type { Plan } from "@/lib/types/entities";
import { toast } from "@/lib/toast";

import { CreatePlanModal } from "../components/create-plan-modal";
import { EditPlanModal } from "../components/edit-plan-modal";
import {
  useDeletePlanMutation,
  useUpdatePlanMutation,
} from "../hooks/mutations";
import { usePlansQuery } from "../hooks/queries";
import { usePlansUrlState } from "../hooks/use-plans-url-state";

function useDebouncedValue<T>(value: T, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
}

export function PlansPage() {
  const {
    listParams,
    statusFilter,
    isCreateOpen,
    isEditOpen,
    editPlanId,
    updateFilters,
    openCreate,
    openEdit,
    closeAction,
  } = usePlansUrlState();

  const [searchInput, setSearchInput] = React.useState(listParams.search ?? "");
  const [deactivateTarget, setDeactivateTarget] = React.useState<Plan | null>(
    null,
  );

  const debouncedSearch = useDebouncedValue(searchInput);

  React.useEffect(() => {
    setSearchInput(listParams.search ?? "");
  }, [listParams.search]);

  React.useEffect(() => {
    if (debouncedSearch !== (listParams.search ?? "")) {
      updateFilters({ search: debouncedSearch || undefined, page: 1 });
    }
  }, [debouncedSearch, listParams.search, updateFilters]);

  const queryParams = React.useMemo(
    () => ({
      ...listParams,
      search: debouncedSearch || undefined,
    }),
    [listParams, debouncedSearch],
  );

  const plansQuery = usePlansQuery(queryParams);
  const deactivateMutation = useDeletePlanMutation();
  const updateMutation = useUpdatePlanMutation();

  const handleSortChange = (sortBy: string) => {
    const isSameColumn = listParams.sortBy === sortBy;
    const nextOrder =
      isSameColumn && listParams.sortOrder === "asc" ? "desc" : "asc";

    updateFilters({
      sortBy,
      sortOrder: nextOrder,
      page: 1,
    });
  };

  const handleDeactivate = async () => {
    if (!deactivateTarget) {
      return;
    }

    try {
      await deactivateMutation.mutateAsync(deactivateTarget.id);
      toast.success("Plan desactivado correctamente");
      setDeactivateTarget(null);
    } catch (error) {
      toast.error("No se pudo desactivar el plan", {
        description: getApiErrorMessage(error),
      });
    }
  };

  const handleReactivate = async (plan: Plan) => {
    try {
      await updateMutation.mutateAsync({
        id: plan.id,
        body: { isActive: true },
      });
      toast.success("Plan reactivado correctamente");
    } catch (error) {
      toast.error("No se pudo reactivar el plan", {
        description: getApiErrorMessage(error),
      });
    }
  };

  const tableColumns = [
    { key: "name", header: "Nombre", sortable: true },
    {
      key: "amount",
      header: "Monto",
      sortable: true,
      render: (plan: Plan) => formatCurrency(Number(plan.amount)),
    },
    {
      key: "durationDays",
      header: "Duración",
      sortable: true,
      render: (plan: Plan) => `${plan.durationDays} días`,
    },
    {
      key: "isVirtual",
      header: "Virtual",
      render: (plan: Plan) => (
        <Badge variant={plan.isVirtual ? "default" : "secondary"}>
          {plan.isVirtual ? "Sí" : "No"}
        </Badge>
      ),
    },
    {
      key: "isActive",
      header: "Estado",
      sortable: true,
      render: (plan: Plan) => (
        <Badge variant={plan.isActive ? "default" : "secondary"}>
          {plan.isActive ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "Acciones",
      render: (plan: Plan) => (
        <CardActions
          actions={[
            {
              variant: "edit",
              onClick: () => openEdit(plan.id),
            },
            ...(plan.isActive
              ? [
                  {
                    variant: "custom" as const,
                    label: "Inactivar",
                    onClick: () => setDeactivateTarget(plan),
                  },
                ]
              : [
                  {
                    variant: "custom" as const,
                    label: "Reactivar",
                    onClick: () => handleReactivate(plan),
                    loading: updateMutation.isPending,
                  },
                ]),
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planes"
        subtitle="Gestiona los planes que ofreces a tus alumnos"
        icon={CreditCard}
        actions={<AddButton label="Crear plan" onClick={openCreate} />}
      />

      <QueryState
        query={plansQuery}
        skeleton={<CfSkeleton variant="table" rows={6} />}
        isEmpty={(data) => data.meta.total === 0}
        errorTitle="No pudimos cargar los planes. Intenta de nuevo."
        empty={
          <DataTable<Plan>
            mode="server"
            data={[]}
            columns={tableColumns}
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            searchPlaceholder="Buscar planes..."
            statusFilter={statusFilter}
            onStatusFilterChange={(value) => updateFilters({ statusFilter: value })}
            sorting={{
              sortBy: listParams.sortBy,
              sortOrder: listParams.sortOrder,
              onSortChange: handleSortChange,
            }}
            pagination={{
              meta: {
                page: listParams.page ?? 1,
                pageSize: listParams.pageSize ?? 10,
                total: 0,
                totalPages: 0,
              },
              onPageChange: (page) => updateFilters({ page }),
              onPageSizeChange: (pageSize) =>
                updateFilters({ pageSize, page: 1 }),
            }}
            emptyMessage="No hay planes registrados"
          />
        }
      >
        {(data) => (
          <DataTable<Plan>
            mode="server"
            data={data.items}
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            searchPlaceholder="Buscar planes..."
            statusFilter={statusFilter}
            onStatusFilterChange={(value) => updateFilters({ statusFilter: value })}
            sorting={{
              sortBy: listParams.sortBy,
              sortOrder: listParams.sortOrder,
              onSortChange: handleSortChange,
            }}
            pagination={{
              meta: data.meta,
              onPageChange: (page) => updateFilters({ page }),
              onPageSizeChange: (pageSize) =>
                updateFilters({ pageSize, page: 1 }),
            }}
            emptyMessage="No hay planes registrados"
            getRowKey={(plan) => plan.id}
            columns={tableColumns}
          />
        )}
      </QueryState>

      <CreatePlanModal
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeAction();
          }
        }}
        onSuccess={closeAction}
      />

      {editPlanId ? (
        <EditPlanModal
          open={isEditOpen}
          planId={editPlanId}
          onOpenChange={(open) => {
            if (!open) {
              closeAction();
            }
          }}
          onSuccess={closeAction}
        />
      ) : null}

      <ConfirmDialog
        open={Boolean(deactivateTarget)}
        onOpenChange={(open) => !open && setDeactivateTarget(null)}
        title={`¿Desactivar el plan "${deactivateTarget?.name}"?`}
        description="El plan ya no podrá asignarse a nuevos alumnos."
        confirmLabel="Desactivar"
        onConfirm={handleDeactivate}
        loading={deactivateMutation.isPending}
      />
    </div>
  );
}
