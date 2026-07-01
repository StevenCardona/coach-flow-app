"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";

import { CfModal, CfModalActions, CfSkeleton, CfTabs, QueryState } from "@/components/cf";
import { Form } from "@/components/ui/form";
import { getTodayDateString } from "@/lib/date";
import { getApiErrorMessage } from "@/lib/http/api-helpers";
import { toast } from "@/lib/toast";

import {
  StudentAdditionalFields,
  StudentPersonalFields,
} from "./student-form-fields";
import { StudentPlanHistoryList } from "./student-plan-history-list";
import { useAssignPlanMutation } from "../hooks/plan-histories/mutations";
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
  const [activeTab, setActiveTab] = React.useState("personal");
  const studentQuery = useStudentQuery(studentId, { enabled: open && !!studentId });
  const updateMutation = useUpdateStudentMutation();
  const assignPlanMutation = useAssignPlanMutation();
  const initialPlanIdRef = React.useRef<string | null>(null);

  const form = useForm<EditStudentFormValues>({
    resolver: zodResolver(editStudentFormSchema),
    defaultValues: editStudentDefaultValues,
  });

  React.useEffect(() => {
    if (open && studentQuery.data) {
      const values = mapStudentToEditFormValues(studentQuery.data);
      initialPlanIdRef.current = values.planId ?? null;
      form.reset(values);
      setActiveTab("personal");
    }
  }, [open, studentQuery.data, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await updateMutation.mutateAsync({
        id: studentId,
        body: mapEditFormToRequest(values),
      });

      const nextPlanId = values.planId ?? null;
      const initialPlanId = initialPlanIdRef.current;

      if (nextPlanId && nextPlanId !== initialPlanId) {
        await assignPlanMutation.mutateAsync({
          studentId,
          body: {
            planId: nextPlanId,
            startDate: getTodayDateString(),
          },
        });
        initialPlanIdRef.current = nextPlanId;
      }

      toast.success("Información del alumno actualizada");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("No se pudo actualizar la información", {
        description: getApiErrorMessage(error),
      });
    }
  });

  const planId = form.watch("planId");
  const isSaving = updateMutation.isPending || assignPlanMutation.isPending;

  return (
    <CfModal
      open={open}
      onOpenChange={onOpenChange}
      title="Editar alumno"
      description="Actualiza la información del estudiante."
      size="lg"
      loading={isSaving}
      footer={
        activeTab === "history" ? null : (
          <CfModalActions
            onCancel={() => onOpenChange(false)}
            onConfirm={handleSubmit}
            confirmLabel="Guardar cambios"
            loading={isSaving}
            disabled={studentQuery.isLoading || studentQuery.isError}
          />
        )
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
              <CfTabs
                value={activeTab}
                onValueChange={setActiveTab}
                tabs={[
                  {
                    value: "personal",
                    label: "Datos personales",
                    content: (
                      <StudentPersonalFields
                        control={form.control}
                        mode="edit"
                        email={student.email}
                        planId={planId}
                        onPlanIdChange={(nextPlanId) =>
                          form.setValue("planId", nextPlanId, {
                            shouldDirty: true,
                          })
                        }
                        selectedPlanLabel={student.activePlan?.name}
                      />
                    ),
                  },
                  {
                    value: "additional",
                    label: "Información adicional",
                    content: (
                      <StudentAdditionalFields control={form.control} />
                    ),
                  },
                  {
                    value: "history",
                    label: "Historial de planes",
                    content: (
                      <StudentPlanHistoryList
                        studentId={studentId}
                        enabled={open && activeTab === "history"}
                      />
                    ),
                  },
                ]}
              />
            </form>
          </Form>
        )}
      </QueryState>
    </CfModal>
  );
}
