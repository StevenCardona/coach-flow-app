"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { CfModal, CfModalActions } from "@/components/cf";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import type { CreateStudentResponse } from "@/lib/types/entities";
import { toast } from "@/lib/toast";

import { StudentFormFields } from "./student-form-fields";
import { useCreateStudentMutation } from "../hooks/students/mutations";
import {
  createStudentDefaultValues,
  createStudentFormSchema,
  type CreateStudentFormValues,
} from "../schemas/student-form.schema";
import { mapCreateFormToRequest } from "../utils/student-form.utils";

export interface CreateStudentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateStudentModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateStudentModalProps) {
  const createMutation = useCreateStudentMutation();
  const [createdStudent, setCreatedStudent] =
    React.useState<CreateStudentResponse | null>(null);

  const form = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentFormSchema),
    defaultValues: createStudentDefaultValues,
  });

  React.useEffect(() => {
    if (open) {
      form.reset(createStudentDefaultValues);
      setCreatedStudent(null);
    }
  }, [open, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await createMutation.mutateAsync(mapCreateFormToRequest(values));
      setCreatedStudent(result);
      toast.success("Alumno creado correctamente", {
        description: result.credentials.message,
      });
      onSuccess?.();
    } catch (error) {
      toast.error("No se pudo crear el alumno", {
        description: getApiErrorMessage(error),
      });
    }
  });

  const handleClose = () => {
    onOpenChange(false);
    setCreatedStudent(null);
  };

  return (
    <CfModal
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
          return;
        }
        onOpenChange(nextOpen);
      }}
      title={createdStudent ? "Credenciales del alumno" : "Nuevo alumno"}
      description={
        createdStudent
          ? "Comparte estas credenciales con el alumno para que pueda iniciar sesión."
          : "Completa los datos para registrar un nuevo estudiante."
      }
      size="lg"
      loading={createMutation.isPending}
      footer={
        createdStudent ? (
          <Button type="button" onClick={handleClose}>
            Cerrar
          </Button>
        ) : (
          <CfModalActions
            onCancel={handleClose}
            onConfirm={handleSubmit}
            confirmLabel="Crear alumno"
            loading={createMutation.isPending}
          />
        )
      }
    >
      {createdStudent ? (
        <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <p>{createdStudent.credentials.message}</p>
          <div>
            <span className="font-medium">Correo: </span>
            <span>{createdStudent.credentials.email}</span>
          </div>
          <div>
            <span className="font-medium">Contraseña inicial: </span>
            <span>{createdStudent.credentials.initialPassword}</span>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <StudentFormFields control={form.control} mode="create" />
          </form>
        </Form>
      )}
    </CfModal>
  );
}
