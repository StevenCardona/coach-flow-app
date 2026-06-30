export const MuscleGroup = {
  CHEST: "CHEST",
  BACK: "BACK",
  LEGS: "LEGS",
  SHOULDERS: "SHOULDERS",
  ARMS: "ARMS",
  CORE: "CORE",
  CARDIO: "CARDIO",
  FULL_BODY: "FULL_BODY",
} as const;

export type MuscleGroup = (typeof MuscleGroup)[keyof typeof MuscleGroup];

export const ExerciseCategory = {
  STRENGTH: "STRENGTH",
  CARDIO: "CARDIO",
  FLEXIBILITY: "FLEXIBILITY",
  BALANCE: "BALANCE",
} as const;

export type ExerciseCategory =
  (typeof ExerciseCategory)[keyof typeof ExerciseCategory];
