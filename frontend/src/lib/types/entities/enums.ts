export const Role = {
  COACH: "COACH",
  STUDENT: "STUDENT",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const TrainingGoal = {
  WEIGHT_LOSS: "WEIGHT_LOSS",
  MUSCLE_GAIN: "MUSCLE_GAIN",
  ENDURANCE: "ENDURANCE",
  FLEXIBILITY: "FLEXIBILITY",
  GENERAL_FITNESS: "GENERAL_FITNESS",
} as const;

export type TrainingGoal = (typeof TrainingGoal)[keyof typeof TrainingGoal];

export const PlanHistoryStatus = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
} as const;

export type PlanHistoryStatus =
  (typeof PlanHistoryStatus)[keyof typeof PlanHistoryStatus];
