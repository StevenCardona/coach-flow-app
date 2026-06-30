export const Role = {
  COACH: "COACH",
  STUDENT: "STUDENT",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const InvitationStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  EXPIRED: "EXPIRED",
} as const;

export type InvitationStatus =
  (typeof InvitationStatus)[keyof typeof InvitationStatus];
