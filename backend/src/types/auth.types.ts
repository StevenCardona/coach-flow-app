export const Role = {
  COACH: "COACH",
  STUDENT: "STUDENT",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
