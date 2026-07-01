"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { CfModal, CfModalActions, CfSkeleton, QueryState } from "@/components/cf";
import { Form } from "@/components/ui/form";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";

import { StudentFormFields } from "./student-form-fields";
import { useUpdateStudentMutation } from "../hooks/students/mutations";
import { useStudentQuery } from "../hooks/students/queries";
import {
  editStudentDefaultValues,
  editStudentFormSchema,
  type EditStudentFormValues,
} from "../schemas/student-form.schema";
import {
  mapEditFormToRequest,
  mapStudentToEditFormValues,
} from "../utils/student-form.utils";

export interface EditStudentModalProps {
  open: boolean;
  studentId: string;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditStudentModal({
  open,
  studentId,
  onOpenChange,
  onSuccess,
}: EditStudentModalProps) {
  const studentQuery = useStudentQuery(studentId, { enabled: open && !!studentId });
  const updateMutation = useUpdateStudentMutation();

  const form = useForm<EditStudentFormValues>({
    resolver: zodResolver(editStudentFormSchema),
    defaultValues: editStudentDefaultValues,
  });

  React.useEffect(() => {
    if (open && studentQuery.data) {
      form.reset(mapStudentToEditFormValues(studentQuery.data));
    }
  }, [open, studentQuery.data, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await updateMutation.mutateAsync({
        id: studentId,
        body: mapEditFormToRequest(values),
      });
      toast.success("Información del alumno actualizada");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("No se pudo actualizar la información", {
        description: getApiErrorMessage(error),
      });
    }
  });

  return (
    <CfModal
      open={open}
      onOpenChange={onOpenChange}
      title="Editar alumno"
      description="Actualiza la información del estudiante."
      size="lg"
      loading={updateMutation.isPending}
      footer={
        <CfModalActions
          onCancel={() => onOpenChange(false)}
          onConfirm={handleSubmit}
          confirmLabel="Guardar cambios"
          loading={updateMutation.isPending}
          disabled={studentQuery.isLoading || studentQuery.isError}
        />
      }
    >
      <QueryState
        query={studentQuery}
        skeleton={<CfSkeleton variant="form" />}
        errorTitle="No pudimos cargar la información del alumno"
      >
        {(student) => (
          <Form {...form}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <StudentFormFields
                control={form.control}
                mode="edit"
                email={student.email}
              />
            </form>
          </Form>
        )}
      </QueryState>
    </CfModal>
  );
}
