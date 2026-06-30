export const CommentEntityType = {
  WORKOUT_SESSION: "WORKOUT_SESSION",
  EXERCISE_LOG: "EXERCISE_LOG",
  MEAL_LOG: "MEAL_LOG",
  NUTRITIONAL_PLAN: "NUTRITIONAL_PLAN",
  WORKOUT_PLAN: "WORKOUT_PLAN",
} as const;

export type CommentEntityType =
  (typeof CommentEntityType)[keyof typeof CommentEntityType];
