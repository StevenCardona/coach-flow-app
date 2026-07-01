export interface CreatePlanInput {
  coachId: string;
  name: string;
  description: string | null;
  amount: string;
  durationDays: number;
  isVirtual: boolean;
}

export interface UpdatePlanInput {
  name?: string;
  description?: string | null;
  amount?: string;
  durationDays?: number;
  isVirtual?: boolean;
  isActive?: boolean;
}

