import type { Plan } from "@/lib/types/entities";

import type {
  CreatePlanFormValues,
  EditPlanFormValues,
} from "../schemas/plan-form.schema";

export function normalizeOptionalString(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function mapCreateFormToRequest(values: CreatePlanFormValues) {
  return {
    name: values.name.trim(),
    description: normalizeOptionalString(values.description),
    amount: values.amount,
    durationDays: values.durationDays,
    isVirtual: values.isVirtual,
  };
}

export function mapEditFormToRequest(values: EditPlanFormValues) {
  return {
    name: values.name.trim(),
    description: normalizeOptionalString(values.description),
    amount: values.amount,
    durationDays: values.durationDays,
    isVirtual: values.isVirtual,
    isActive: values.isActive,
  };
}

export function mapPlanToEditFormValues(plan: Plan): EditPlanFormValues {
  return {
    name: plan.name,
    description: plan.description ?? "",
    amount: Number(plan.amount),
    durationDays: plan.durationDays,
    isVirtual: plan.isVirtual,
    isActive: plan.isActive,
  };
}
