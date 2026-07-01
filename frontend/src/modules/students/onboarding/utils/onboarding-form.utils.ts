import type {
  BodyMeasurement,
  FitnessGoal,
  PersonalInfoResponse,
} from "@/lib/types/entities";

import type { BodyMeasurementsFormValues } from "../schemas/body-measurements.schema";
import type { FitnessGoalsFormValues } from "../schemas/fitness-goals.schema";
import type { PersonalInfoFormValues } from "../schemas/personal-info.schema";
import type {
  CreateBodyMeasurementRequest,
  CreateFitnessGoalRequest,
  CreatePersonalInfoRequest,
  UpdateBodyMeasurementRequest,
  UpdateFitnessGoalRequest,
  UpdatePersonalInfoRequest,
} from "../types/requests";

function parseOptionalNumber(value: number | null | undefined) {
  if (value == null || value === 0) {
    return null;
  }

  return value;
}

export function mapPersonalInfoToForm(
  data: PersonalInfoResponse | null | undefined,
): PersonalInfoFormValues {
  return {
    phoneNumber: data?.phoneNumber ?? "",
    birthday: data?.birthday ?? "",
    gender: data?.gender ?? ("MALE" as PersonalInfoFormValues["gender"]),
    observations: data?.observations ?? "",
    medicalCondition: data?.medicalCondition ?? "",
  };
}

export function mapPersonalInfoToCreateRequest(
  values: PersonalInfoFormValues,
): CreatePersonalInfoRequest {
  return {
    phoneNumber: values.phoneNumber.trim(),
    birthday: values.birthday,
    gender: values.gender,
    observations: values.observations?.trim() || null,
    medicalCondition: values.medicalCondition?.trim() || null,
  };
}

export function mapPersonalInfoToUpdateRequest(
  values: PersonalInfoFormValues,
): UpdatePersonalInfoRequest {
  return mapPersonalInfoToCreateRequest(values);
}

export function mapBodyMeasurementToForm(
  data: BodyMeasurement | null | undefined,
): BodyMeasurementsFormValues {
  return {
    weightKg: data ? Number(data.weightKg) : 0,
    heightCm: data ? Number(data.heightCm) : 0,
    measuredAt: data?.measuredAt ?? new Date().toISOString().slice(0, 10),
    chestCm: data?.chestCm ? Number(data.chestCm) : null,
    waistCm: data?.waistCm ? Number(data.waistCm) : null,
    hipCm: data?.hipCm ? Number(data.hipCm) : null,
    armCm: data?.armCm ? Number(data.armCm) : null,
    bicepCm: data?.bicepCm ? Number(data.bicepCm) : null,
  };
}

export function mapBodyMeasurementToCreateRequest(
  values: BodyMeasurementsFormValues,
): CreateBodyMeasurementRequest {
  return {
    weightKg: values.weightKg,
    heightCm: values.heightCm,
    measuredAt: values.measuredAt,
    chestCm: parseOptionalNumber(values.chestCm),
    waistCm: parseOptionalNumber(values.waistCm),
    hipCm: parseOptionalNumber(values.hipCm),
    armCm: parseOptionalNumber(values.armCm),
    bicepCm: parseOptionalNumber(values.bicepCm),
  };
}

export function mapBodyMeasurementToUpdateRequest(
  values: BodyMeasurementsFormValues,
): UpdateBodyMeasurementRequest {
  return mapBodyMeasurementToCreateRequest(values);
}

export function mapFitnessGoalToForm(
  data: FitnessGoal | null | undefined,
): FitnessGoalsFormValues {
  return {
    trainingGoal: data?.trainingGoal ?? ("GENERAL_FITNESS" as FitnessGoalsFormValues["trainingGoal"]),
    weeklyTrainingHours: data?.weeklyTrainingHours ?? 3,
    budgetForNutrition: data?.budgetForNutrition
      ? Number(data.budgetForNutrition)
      : null,
    hasGymAccess: data?.hasGymAccess ?? false,
    trainsFromHome: data?.trainsFromHome ?? false,
    additionalInfo: data?.additionalInfo ?? "",
  };
}

export function mapFitnessGoalToCreateRequest(
  values: FitnessGoalsFormValues,
): CreateFitnessGoalRequest {
  return {
    trainingGoal: values.trainingGoal,
    weeklyTrainingHours: values.weeklyTrainingHours,
    budgetForNutrition: parseOptionalNumber(values.budgetForNutrition ?? null),
    hasGymAccess: values.hasGymAccess,
    trainsFromHome: values.trainsFromHome,
    additionalInfo: values.additionalInfo?.trim() || null,
  };
}

export function mapFitnessGoalToUpdateRequest(
  values: FitnessGoalsFormValues,
): UpdateFitnessGoalRequest {
  return mapFitnessGoalToCreateRequest(values);
}
