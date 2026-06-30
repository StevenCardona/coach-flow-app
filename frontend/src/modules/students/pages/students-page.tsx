"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AddButton,
  CfModal,
  CfModalActions,
  CfSkeleton,
  CfTabs,
  DataTable,
  DeleteDialog,
  FormField,
  FormSection,
  PageHeader,
  QueryState,
} from "@/components/cf";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import { formatDate } from "@/lib/format";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { Gender } from "@/lib/types/entities";
import type { Student } from "@/lib/types/entities";
import { toast } from "@/lib/toast";
import {
  useCreateStudentMutation,
  useDeleteStudentMutation,
} from "../hooks/students/mutations";
import { useStudentsQuery } from "../hooks/students/queries";

const genderLabels: Record<Gender, string> = {
  MALE: "Masculino",
  FEMALE: "Femenino",
  OTHER: "Otro",
};

const createStudentSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Ingresa un correo válido"),
  phoneNumber: z.string().optional(),
  birthday: z.string().optional(),
  gender: z.nativeEnum(Gender).optional().nullable(),
  observations: z.string().optional(),
  medicalCondition: z.string().optional(),
});

type CreateStudentFormValues = z.infer<typeof createStudentSchema>;

const defaultValues: CreateStudentFormValues = {
  name: "",
  email: "",
  phoneNumber: "",
  birthday: "",
  gender: null,
  observations: "",
  medicalCondition: "",
};

function StudentsTable({
  students,
  onDelete,
}: {
  students: Student[];
  onDelete: (student: Student) => void;
}) {
  return (
    <DataTable<Student>
      data={students}
      searchKeys={["name", "email"]}
      searchPlaceholder="Buscar alumnos..."
      emptyMessage="No hay alumnos en esta sección"
      getRowKey={(student) => student.id}
      columns={[
        { key: "name", header: "Nombre" },
        { key: "email", header: "Correo" },
        {
          key: "birthday",
          header: "Nacimiento",
          render: (student) => formatDate(student.birthday),
        },
        {
          key: "gender",
          header: "Género",
          render: (student) =>
            student.gender ? genderLabels[student.gender] : "—",
        },
        {
          key: "isActive",
          header: "Estado",
          render: (student) => (
            <Badge variant={student.isActive ? "default" : "secondary"}>
              {student.isActive ? "Activo" : "Inactivo"}
            </Badge>
          ),
        },
        {
          key: "id",
          header: "Acciones",
          render: (student) => (
            <button
              type="button"
              className="text-sm text-destructive hover:underline"
              onClick={() => onDelete(student)}
            >
              Eliminar
            </button>
          ),
        },
      ]}
    />
  );
}

export function StudentsPage() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<Student | null>(null);

  const studentsQuery = useStudentsQuery();
  const createMutation = useCreateStudentMutation();
  const deleteMutation = useDeleteStudentMutation();

  const form = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues,
  });

  const handleCreate = form.handleSubmit(async (values) => {
    try {
      await createMutation.mutateAsync({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber || null,
        birthday: values.birthday || null,
        gender: values.gender ?? null,
        observations: values.observations || null,
        medicalCondition: values.medicalCondition || null,
      });
      toast.success("Alumno creado correctamente");
      form.reset(defaultValues);
      setCreateOpen(false);
    } catch (error) {
      toast.error("No se pudo crear el alumno", {
        description: getApiErrorMessage(error),
      });
    }
  });

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alumnos"
        subtitle="Gestiona tus estudiantes y su información"
        icon={Users}
        actions={
          <AddButton
            label="Agregar alumno"
            onClick={() => setCreateOpen(true)}
          />
        }
      />

      <QueryState
        query={studentsQuery}
        skeleton={<CfSkeleton variant="table" rows={6} />}
        isEmpty={(data) => data.length === 0}
        empty={
          <CfTabs
            tabs={[
              {
                value: "active",
                label: "Activos",
                content: (
                  <DataTable<Student>
                    data={[]}
                    searchKeys={["name", "email"]}
                    emptyMessage="No hay alumnos registrados"
                    columns={[
                      { key: "name", header: "Nombre" },
                      { key: "email", header: "Correo" },
                    ]}
                  />
                ),
              },
              {
                value: "inactive",
                label: "Inactivos",
                content: (
                  <DataTable<Student>
                    data={[]}
                    searchKeys={["name", "email"]}
                    emptyMessage="No hay alumnos inactivos"
                    columns={[
                      { key: "name", header: "Nombre" },
                      { key: "email", header: "Correo" },
                    ]}
                  />
                ),
              },
            ]}
          />
        }
      >
        {(students) => {
          const activeStudents = students.filter((student) => student.isActive);
          const inactiveStudents = students.filter((student) => !student.isActive);

          return (
            <CfTabs
              tabs={[
                {
                  value: "active",
                  label: `Activos (${activeStudents.length})`,
                  content: (
                    <StudentsTable
                      students={activeStudents}
                      onDelete={setDeleteTarget}
                    />
                  ),
                },
                {
                  value: "inactive",
                  label: `Inactivos (${inactiveStudents.length})`,
                  content: (
                    <StudentsTable
                      students={inactiveStudents}
                      onDelete={setDeleteTarget}
                    />
                  ),
                },
              ]}
            />
          );
        }}
      </QueryState>

      <CfModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="Nuevo alumno"
        description="Completa los datos para invitar a un nuevo estudiante."
        size="lg"
        loading={createMutation.isPending}
        footer={
          <CfModalActions
            onCancel={() => setCreateOpen(false)}
            onConfirm={handleCreate}
            confirmLabel="Crear alumno"
            loading={createMutation.isPending}
          />
        }
      >
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleCreate}>
            <FormSection title="Datos personales">
              <FormField
                control={form.control}
                name="name"
                label="Nombre completo"
                type="text"
                required
              />
              <FormField
                control={form.control}
                name="email"
                label="Correo electrónico"
                type="email"
                required
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                label="Teléfono"
                type="tel"
              />
              <FormField
                control={form.control}
                name="birthday"
                label="Fecha de nacimiento"
                type="date"
              />
              <FormField
                control={form.control}
                name="gender"
                label="Género"
                type="select"
                options={[
                  { label: "Masculino", value: Gender.MALE },
                  { label: "Femenino", value: Gender.FEMALE },
                  { label: "Otro", value: Gender.OTHER },
                ]}
              />
            </FormSection>
            <FormSection title="Información adicional">
              <FormField
                control={form.control}
                name="observations"
                label="Observaciones"
                type="textarea"
              />
              <FormField
                control={form.control}
                name="medicalCondition"
                label="Condición médica"
                type="textarea"
              />
            </FormSection>
          </form>
        </Form>
      </CfModal>

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
