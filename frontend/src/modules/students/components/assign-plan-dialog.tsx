"use client";

import * as React from "react";

import { CfModal, CfModalActions } from "@/components/cf";
import { PlanSelector } from "@/modules/coach/plans";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import type { StudentListItem } from "@/lib/types/entities";
import { getTodayDateString } from "@/lib/date";
import { toast } from "@/lib/toast";

import { useAssignPlanMutation } from "../hooks/plan-histories/mutations";

export interface AssignPlanDialogProps {
  student: StudentListItem | null;
  onOpenChange: (open: boolean) => void;
}

export function AssignPlanDialog({ student, onOpenChange }: AssignPlanDialogProps) {
  const assignMutation = useAssignPlanMutation();
  const [planId, setPlanId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (student) {
      setPlanId(student.activePlan?.id ?? null);
    } else {
      setPlanId(null);
    }
  }, [student]);

  const handleClose = () => onOpenChange(false);

  const handleConfirm = async () => {
    if (!student || !planId) {
      toast.error("Selecciona un plan para continuar");
      return;
    }

    try {
      await assignMutation.mutateAsync({
        studentId: student.id,
        body: {
          planId,
          startDate: getTodayDateString(),
        },
      });
      toast.success("Plan asignado correctamente");
      handleClose();
    } catch (error) {
      toast.error("No se pudo asignar el plan", {
        description: getApiErrorMessage(error),
      });
    }
  };

  return (
    <CfModal
      open={Boolean(student)}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
      title="Asignar plan"
      description={
        student
          ? `Selecciona el plan para ${student.name}.`
          : undefined
      }
      size="md"
      loading={assignMutation.isPending}
      footer={
        <CfModalActions
          onCancel={handleClose}
          onConfirm={handleConfirm}
          confirmLabel="Asignar plan"
          loading={assignMutation.isPending}
          disabled={!planId}
        />
      }
    >
      <PlanSelector
        value={planId}
        onValueChange={setPlanId}
        label="Plan"
        selectedPlanLabel={student?.activePlan?.name}
        required
      />
    </CfModal>
  );
}
