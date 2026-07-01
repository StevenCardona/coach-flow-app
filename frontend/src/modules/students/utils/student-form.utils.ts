import type { StudentDetail } from "@/lib/types/entities";

import type {
  CreateStudentFormValues,
  EditStudentFormValues,
} from "../schemas/student-form.schema";

export function mapStudentToEditFormValues(student: StudentDetail): EditStudentFormValues {
  return {
    name: student.name,
    phoneNumber: student.phoneNumber ?? "",
    birthday: student.birthday ?? "",
    gender: student.gender,
    observations: student.observations ?? "",
    medicalCondition: student.medicalCondition ?? "",
    planId: student.activePlan?.id ?? null,
  };
}

export function normalizeOptionalString(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function mapCreateFormToRequest(values: CreateStudentFormValues) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    phoneNumber: normalizeOptionalString(values.phoneNumber),
    birthday: normalizeOptionalString(values.birthday),
    gender: values.gender ?? null,
    observations: normalizeOptionalString(values.observations),
    medicalCondition: normalizeOptionalString(values.medicalCondition),
  };
}

export function mapEditFormToRequest(values: EditStudentFormValues) {
  return {
    name: values.name.trim(),
    phoneNumber: normalizeOptionalString(values.phoneNumber),
    birthday: normalizeOptionalString(values.birthday),
    gender: values.gender ?? null,
    observations: normalizeOptionalString(values.observations),
    medicalCondition: normalizeOptionalString(values.medicalCondition),
  };
}
