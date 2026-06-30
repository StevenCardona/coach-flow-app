export const TrainingGoal = {
  WEIGHT_LOSS: "WEIGHT_LOSS",
  MUSCLE_GAIN: "MUSCLE_GAIN",
  ENDURANCE: "ENDURANCE",
  FLEXIBILITY: "FLEXIBILITY",
  GENERAL_FITNESS: "GENERAL_FITNESS",
} as const;

export type TrainingGoal = (typeof TrainingGoal)[keyof typeof TrainingGoal];

export const DayOfWeek = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

export const PlanHistoryStatus = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
} as const;

export type PlanHistoryStatus =
  (typeof PlanHistoryStatus)[keyof typeof PlanHistoryStatus];
