export const MealType = {
  BREAKFAST: "BREAKFAST",
  MID_MORNING: "MID_MORNING",
  LUNCH: "LUNCH",
  MID_AFTERNOON: "MID_AFTERNOON",
  DINNER: "DINNER",
  SNACK: "SNACK",
} as const;

export type MealType = (typeof MealType)[keyof typeof MealType];

export const FoodCategory = {
  PROTEIN: "PROTEIN",
  CARB: "CARB",
  FAT: "FAT",
  VEGETABLE: "VEGETABLE",
  FRUIT: "FRUIT",
  SUPPLEMENT: "SUPPLEMENT",
} as const;

export type FoodCategory = (typeof FoodCategory)[keyof typeof FoodCategory];
