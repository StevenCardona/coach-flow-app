export interface CreateStudentPlanHistoryInput {
  studentId: string;
  planId: string;
  startDate: string;
  endDate: string | null;
  status: string;
  registeredBy: string;
  notes: string | null;
}

export interface AssignPlanInput {
  coachId: string;
  userId: string;
  studentId: string;
  planId: string;
  startDate: string;
  endDate?: string | null;
  notes?: string | null;
}
