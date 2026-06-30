import type { Gender, TrainingGoal } from "@/lib/types/entities";

export interface CreatePersonalInfoRequest {
  phoneNumber: string;
  birthday: string;
  gender: Gender;
  observations?: string | null;
  medicalCondition?: string | null;
}

export interface UpdatePersonalInfoRequest {
  phoneNumber?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  observations?: string | null;
  medicalCondition?: string | null;
}

export interface CreateBodyMeasurementRequest {
  weightKg: number;
  heightCm: number;
  measuredAt: string;
  chestCm?: number | null;
  waistCm?: number | null;
  hipCm?: number | null;
  armCm?: number | null;
  bicepCm?: number | null;
}

export interface UpdateBodyMeasurementRequest {
  weightKg?: number;
  heightCm?: number;
  measuredAt?: string;
  chestCm?: number | null;
  waistCm?: number | null;
  hipCm?: number | null;
  armCm?: number | null;
  bicepCm?: number | null;
}

export interface CreateFitnessGoalRequest {
  trainingGoal: TrainingGoal;
  weeklyTrainingHours: number;
  budgetForNutrition?: number | null;
  hasGymAccess: boolean;
  trainsFromHome: boolean;
  additionalInfo?: string | null;
}

export interface UpdateFitnessGoalRequest {
  trainingGoal?: TrainingGoal;
  weeklyTrainingHours?: number;
  budgetForNutrition?: number | null;
  hasGymAccess?: boolean;
  trainsFromHome?: boolean;
  additionalInfo?: string | null;
}
