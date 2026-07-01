"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { CfModal, CfModalActions } from "@/components/cf";
import { Form } from "@/components/ui/form";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";

import { PlanFormFields } from "./plan-form-fields";
import { useCreatePlanMutation } from "../hooks/mutations";
import {
  createPlanDefaultValues,
  createPlanFormSchema,
  type CreatePlanFormInput,
  type CreatePlanFormValues,
} from "../schemas/plan-form.schema";
import { mapCreateFormToRequest } from "../utils/plan-form.utils";

export interface CreatePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreatePlanModal({
  open,
  onOpenChange,
  onSuccess,
}: CreatePlanModalProps) {
  const createMutation = useCreatePlanMutation();

  const form = useForm<CreatePlanFormInput, unknown, CreatePlanFormValues>({
    resolver: zodResolver(createPlanFormSchema),
    defaultValues: createPlanDefaultValues,
  });

  React.useEffect(() => {
    if (open) {
      form.reset(createPlanDefaultValues);
    }
  }, [open, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await createMutation.mutateAsync(mapCreateFormToRequest(values));
      toast.success("Plan creado correctamente");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("No se pudo crear el plan", {
        description: getApiErrorMessage(error),
      });
    }
  });

  return (
    <CfModal
      open={open}
      onOpenChange={onOpenChange}
      title="Crear plan"
      description="Define un nuevo plan para tus alumnos."
      size="lg"
      loading={createMutation.isPending}
      footer={
        <CfModalActions
          onCancel={() => onOpenChange(false)}
          onConfirm={handleSubmit}
          confirmLabel="Crear plan"
          loading={createMutation.isPending}
        />
      }
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <PlanFormFields control={form.control} mode="create" />
        </form>
      </Form>
    </CfModal>
  );
}
