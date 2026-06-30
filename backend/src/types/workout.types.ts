export const Intensity = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type Intensity = (typeof Intensity)[keyof typeof Intensity];

export const SessionStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  SKIPPED: "SKIPPED",
} as const;

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus];

export const LogStatus = {
  COMPLETED: "COMPLETED",
  PARTIAL: "PARTIAL",
  SKIPPED: "SKIPPED",
} as const;

export type LogStatus = (typeof LogStatus)[keyof typeof LogStatus];
