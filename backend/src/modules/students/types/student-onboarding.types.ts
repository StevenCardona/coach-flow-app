import type { Gender, TrainingGoal } from "../../../types";

export interface CreateBodyMeasurementInput {
  studentId: string;
  weightKg: string;
  heightCm: string;
  chestCm?: string | null;
  waistCm?: string | null;
  hipCm?: string | null;
  armCm?: string | null;
  bicepCm?: string | null;
  measuredAt: string;
}

export interface CreateFitnessGoalInput {
  studentId: string;
  trainingGoal: TrainingGoal;
  weeklyTrainingHours: number;
  budgetForNutrition?: string | null;
  hasGymAccess: boolean;
  trainsFromHome: boolean;
  additionalInfo?: string | null;
}

export interface UpdatePersonalInfoInput {
  phoneNumber?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  observations?: string | null;
  medicalCondition?: string | null;
  personalInfoCompleted?: boolean;
}

export interface PersonalInfoResponse {
  phoneNumber: string | null;
  birthday: string | null;
  gender: Gender | null;
  observations: string | null;
  medicalCondition: string | null;
  personalInfoCompleted: boolean;
}
