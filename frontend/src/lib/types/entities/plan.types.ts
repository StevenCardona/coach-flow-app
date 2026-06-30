import type { PlanHistoryStatus } from "./enums";
import type { Timestamps } from "./common";

export interface Plan extends Timestamps {
  id: string;
  coachId: string;
  name: string;
  description: string | null;
  amount: string;
  durationDays: number;
  isVirtual: boolean;
  isActive: boolean;
}

export interface StudentPlanHistory extends Timestamps {
  id: string;
  studentId: string;
  planId: string;
  startDate: string;
  endDate: string | null;
  status: PlanHistoryStatus;
  registeredBy: string;
  notes: string | null;
  plan?: Plan;
}
