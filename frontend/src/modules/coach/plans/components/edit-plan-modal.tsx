"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { CfModal, CfModalActions, CfSkeleton, QueryState } from "@/components/cf";
import { Form } from "@/components/ui/form";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";

import { PlanFormFields } from "./plan-form-fields";
import { useUpdatePlanMutation } from "../hooks/mutations";
import { usePlanQuery } from "../hooks/queries";
import {
  editPlanDefaultValues,
  editPlanFormSchema,
  type EditPlanFormInput,
  type EditPlanFormValues,
} from "../schemas/plan-form.schema";
import {
  mapEditFormToRequest,
  mapPlanToEditFormValues,
} from "../utils/plan-form.utils";

export interface EditPlanModalProps {
  open: boolean;
  planId: string;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditPlanModal({
  open,
  planId,
  onOpenChange,
  onSuccess,
}: EditPlanModalProps) {
  const planQuery = usePlanQuery(planId, { enabled: open && !!planId });
  const updateMutation = useUpdatePlanMutation();

  const form = useForm<EditPlanFormInput, unknown, EditPlanFormValues>({
    resolver: zodResolver(editPlanFormSchema),
    defaultValues: editPlanDefaultValues,
  });

  React.useEffect(() => {
    if (open && planQuery.data) {
      form.reset(mapPlanToEditFormValues(planQuery.data));
    }
  }, [open, planQuery.data, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await updateMutation.mutateAsync({
        id: planId,
        body: mapEditFormToRequest(values),
      });
      toast.success("Plan actualizado correctamente");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("No se pudo actualizar el plan", {
        description: getApiErrorMessage(error),
      });
    }
  });

  return (
    <CfModal
      open={open}
      onOpenChange={onOpenChange}
      title="Editar plan"
      description="Actualiza la información del plan."
      size="lg"
      loading={updateMutation.isPending}
      footer={
        <CfModalActions
          onCancel={() => onOpenChange(false)}
          onConfirm={handleSubmit}
          confirmLabel="Guardar cambios"
          loading={updateMutation.isPending}
          disabled={planQuery.isLoading || planQuery.isError}
        />
      }
    >
      <QueryState
        query={planQuery}
        skeleton={<CfSkeleton variant="form" />}
        errorTitle="No pudimos cargar la información del plan"
      >
        {() => (
          <Form {...form}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <PlanFormFields control={form.control} mode="edit" />
            </form>
          </Form>
        )}
      </QueryState>
    </CfModal>
  );
}
