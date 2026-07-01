"use client";

import { UserX, Users } from "lucide-react";
import * as React from "react";

import {
  AddButton,
  CardActions,
  CfSkeleton,
  ConfirmDialog,
  DataTable,
  DeleteDialog,
  PageHeader,
  QueryState,
} from "@/components/cf";
import { Badge } from "@/components/ui/badge";
import { calculateAge, formatDate } from "@/lib/format";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { Gender } from "@/lib/types/entities";
import type { StudentListItem } from "@/lib/types/entities";
import { toast } from "@/lib/toast";

import { AssignPlanDialog } from "../components/assign-plan-dialog";
import { CreateStudentModal } from "../components/create-student-modal";
import { EditStudentModal } from "../components/edit-student-modal";
import { StudentActivePlanCell } from "../components/student-active-plan-cell";
import { StudentsDashboard } from "../components/students-dashboard";
import {
  useDeactivateStudentMutation,
  useDeleteStudentMutation,
} from "../hooks/students/mutations";
import { useStudentsQuery } from "../hooks/students/queries";
import { useStudentsUrlState } from "../hooks/use-students-url-state";

const genderLabels: Record<Gender, string> = {
  MALE: "Masculino",
  FEMALE: "Femenino",
  OTHER: "Otro",
};

function useDebouncedValue<T>(value: T, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
}

export function StudentsPage() {
  const {
    listParams,
    statusFilter,
    isCreateOpen,
    isEditOpen,
    editStudentId,
    updateFilters,
    openCreate,
    openEdit,
    closeAction,
  } = useStudentsUrlState();

  const [searchInput, setSearchInput] = React.useState(listParams.search ?? "");
  const [deleteTarget, setDeleteTarget] = React.useState<StudentListItem | null>(
    null,
  );
  const [deactivateTarget, setDeactivateTarget] =
    React.useState<StudentListItem | null>(null);
  const [assignPlanTarget, setAssignPlanTarget] =
    React.useState<StudentListItem | null>(null);

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

  const studentsQuery = useStudentsQuery(queryParams);
  const deleteMutation = useDeleteStudentMutation();
  const deactivateMutation = useDeactivateStudentMutation();

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

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Alumno eliminado correctamente");
      setDeleteTarget(null);
    } catch (error) {
      toast.error("No se pudo eliminar el alumno", {
        description: getApiErrorMessage(error),
      });
    }
  };

  const handleDeactivate = async () => {
    if (!deactivateTarget) {
      return;
    }

    try {
      await deactivateMutation.mutateAsync(deactivateTarget.id);
      toast.success("Alumno inactivado correctamente");
      setDeactivateTarget(null);
    } catch (error) {
      toast.error("No se pudo inactivar al alumno", {
        description: getApiErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alumnos"
        subtitle="Gestiona tus estudiantes y su información"
        icon={Users}
        actions={<AddButton label="Agregar alumno" onClick={openCreate} />}
      />

      <StudentsDashboard />

      <QueryState
        query={studentsQuery}
        skeleton={<CfSkeleton variant="table" rows={6} />}
        isEmpty={(data) => data.meta.total === 0}
        errorTitle="No pudimos cargar los alumnos. Intenta de nuevo."
        empty={
          <DataTable<StudentListItem>
            mode="server"
            data={[]}
            columns={[
              { key: "name", header: "Nombre", sortable: true },
              { key: "email", header: "Correo", sortable: true },
            ]}
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            searchPlaceholder="Buscar alumnos..."
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
            emptyMessage="No hay alumnos registrados"
          />
        }
      >
        {(data) => (
          <DataTable<StudentListItem>
            mode="server"
            data={data.items}
            searchValue={searchInput}
            onSearchChange={setSearchInput}
            searchPlaceholder="Buscar alumnos..."
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
            emptyMessage="No hay alumnos registrados"
            getRowKey={(student) => student.id}
            columns={[
              { key: "name", header: "Nombre", sortable: true },
              {
                key: "email",
                header: "Correo",
                sortable: true,
                render: (student) => (
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate">{student.email}</span>
                    <Badge
                      variant={student.isActive ? "default" : "secondary"}
                      className="shrink-0"
                    >
                      {student.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                ),
              },
              {
                key: "activePlan",
                header: "Plan activo",
                render: (student) => (
                  <StudentActivePlanCell
                    student={student}
                    onAssignPlan={setAssignPlanTarget}
                  />
                ),
              },
              {
                key: "birthday",
                header: "Nacimiento",
                sortable: true,
                render: (student) => formatDate(student.birthday),
              },
              {
                key: "age",
                header: "Edad",
                render: (student) => calculateAge(student.birthday),
              },
              {
                key: "gender",
                header: "Género",
                render: (student) =>
                  student.gender ? genderLabels[student.gender] : "—",
              },
              {
                key: "id",
                render: (student) => (
                  <CardActions
                    actions={[
                      {
                        variant: "edit",
                        iconOnly: true,
                        onClick: () => openEdit(student.id),
                      },
                      ...(student.isActive
                        ? [
                            {
                              variant: "custom" as const,
                              label: "Inactivar",
                              icon: <UserX className="size-4" />,
                              iconOnly: true,
                              onClick: () => setDeactivateTarget(student),
                            },
                          ]
                        : []),
                      {
                        variant: "delete",
                        onClick: () => setDeleteTarget(student),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        )}
      </QueryState>

      <CreateStudentModal
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeAction();
          }
        }}
        onSuccess={closeAction}
      />

      {editStudentId ? (
        <EditStudentModal
          open={isEditOpen}
          studentId={editStudentId}
          onOpenChange={(open) => {
            if (!open) {
              closeAction();
            }
          }}
          onSuccess={closeAction}
        />
      ) : null}

      <AssignPlanDialog
        student={assignPlanTarget}
        onOpenChange={(open) => {
          if (!open) {
            setAssignPlanTarget(null);
          }
        }}
      />

      <ConfirmDialog
        open={Boolean(deactivateTarget)}
        onOpenChange={(open) => !open && setDeactivateTarget(null)}
        title={`¿Inactivar a ${deactivateTarget?.name}?`}
        description="Ya no podrá acceder a la plataforma."
        confirmLabel="Inactivar"
        onConfirm={handleDeactivate}
        loading={deactivateMutation.isPending}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        itemName={deleteTarget?.name}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
