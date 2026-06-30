import { sequelize } from "../../../config/db/db";
import { PlanHistoryStatus } from "../../../types";
import { studentService } from "../../students/services/student.service";
import { Plan } from "../models/plan.model";
import { studentPlanHistoryRepository } from "../repositories/student-plan-history.repository";
import { planService } from "./plan.service";
import type { AssignPlanInput } from "../types/student-plan-history.types";

function addDaysToDate(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export const studentPlanHistoryService = {
  async assignPlan(input: AssignPlanInput) {
    await studentService.getByCoachAndId(input.coachId, input.studentId);

    const plan = await planService.getActiveByCoachAndId(
      input.coachId,
      input.planId,
    );

    const endDate =
      input.endDate ?? addDaysToDate(input.startDate, plan.durationDays);

    const history = await sequelize.transaction(async (transaction) => {
      await studentPlanHistoryRepository.cancelActiveByStudentId(
        input.studentId,
        transaction,
      );

      return studentPlanHistoryRepository.create(
        {
          studentId: input.studentId,
          planId: input.planId,
          startDate: input.startDate,
          endDate,
          status: PlanHistoryStatus.ACTIVE,
          registeredBy: input.userId,
          notes: input.notes ?? null,
        },
        transaction,
      );
    });

    return history.reload({
      include: [{ model: Plan, as: "plan" }],
    });
  },

  async listByStudent(coachId: string, studentId: string) {
    await studentService.getByCoachAndId(coachId, studentId);

    return studentPlanHistoryRepository.findByStudentId(studentId);
  },
};
