export interface CreatePlanRequest {
  name: string;
  description?: string | null;
  amount: number;
  durationDays: number;
  isVirtual: boolean;
}

export interface UpdatePlanRequest {
  name?: string;
  description?: string | null;
  amount?: number;
  durationDays?: number;
  isVirtual?: boolean;
  isActive?: boolean;
}
