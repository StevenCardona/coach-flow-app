export const AiEntityType = {
  WORKOUT_PLAN: "WORKOUT_PLAN",
  NUTRITIONAL_PLAN: "NUTRITIONAL_PLAN",
} as const;

export type AiEntityType = (typeof AiEntityType)[keyof typeof AiEntityType];
