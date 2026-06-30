import type { Student } from "../models/student.model";
import type { TrainingGoal } from "../../../types";
import type { PersonalInfoResponse } from "../types/student-onboarding.types";

export function toPersonalInfoResponse(student: Student): PersonalInfoResponse {
  return {
    phoneNumber: student.phoneNumber,
    birthday: student.birthday,
    gender: student.gender,
    observations: student.observations,
    medicalCondition: student.medicalCondition,
    personalInfoCompleted: student.personalInfoCompleted,
  };
}

function toDecimalString(value: number): string {
  return String(value);
}

export function mapBodyMeasurementInput(input: {
  weightKg?: number;
  heightCm?: number;
  measuredAt?: string;
  chestCm?: number | null;
  waistCm?: number | null;
  hipCm?: number | null;
  armCm?: number | null;
  bicepCm?: number | null;
}) {
  return {
    ...(input.weightKg !== undefined
      ? { weightKg: toDecimalString(input.weightKg) }
      : {}),
    ...(input.heightCm !== undefined
      ? { heightCm: toDecimalString(input.heightCm) }
      : {}),
    ...(input.measuredAt !== undefined ? { measuredAt: input.measuredAt } : {}),
    ...(input.chestCm !== undefined
      ? { chestCm: input.chestCm === null ? null : toDecimalString(input.chestCm) }
      : {}),
    ...(input.waistCm !== undefined
      ? { waistCm: input.waistCm === null ? null : toDecimalString(input.waistCm) }
      : {}),
    ...(input.hipCm !== undefined
      ? { hipCm: input.hipCm === null ? null : toDecimalString(input.hipCm) }
      : {}),
    ...(input.armCm !== undefined
      ? { armCm: input.armCm === null ? null : toDecimalString(input.armCm) }
      : {}),
    ...(input.bicepCm !== undefined
      ? { bicepCm: input.bicepCm === null ? null : toDecimalString(input.bicepCm) }
      : {}),
  };
}

export function mapFitnessGoalInput(input: {
  trainingGoal?: string;
  weeklyTrainingHours?: number;
  budgetForNutrition?: number | null;
  hasGymAccess?: boolean;
  trainsFromHome?: boolean;
  additionalInfo?: string | null;
}) {
  return {
    ...(input.trainingGoal !== undefined
      ? { trainingGoal: input.trainingGoal as TrainingGoal }
      : {}),
    ...(input.weeklyTrainingHours !== undefined
      ? { weeklyTrainingHours: input.weeklyTrainingHours }
      : {}),
    ...(input.budgetForNutrition !== undefined
      ? {
          budgetForNutrition:
            input.budgetForNutrition === null
              ? null
              : String(input.budgetForNutrition),
        }
      : {}),
    ...(input.hasGymAccess !== undefined
      ? { hasGymAccess: input.hasGymAccess }
      : {}),
    ...(input.trainsFromHome !== undefined
      ? { trainsFromHome: input.trainsFromHome }
      : {}),
    ...(input.additionalInfo !== undefined
      ? { additionalInfo: input.additionalInfo }
      : {}),
  };
}
