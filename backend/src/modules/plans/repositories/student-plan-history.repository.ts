import type { Transaction } from "sequelize";

import { PlanHistoryStatus } from "../../../types";
import { Plan } from "../models/plan.model";
import { StudentPlanHistory } from "../models/student-plan-history.model";
import type { CreateStudentPlanHistoryInput } from "../types/student-plan-history.types";

export const studentPlanHistoryRepository = {
  create(data: CreateStudentPlanHistoryInput, transaction?: Transaction) {
    return StudentPlanHistory.create(
      {
        ...data,
        status: data.status as PlanHistoryStatus,
      },
      { transaction },
    );
  },

  cancelActiveByStudentId(studentId: string, transaction?: Transaction) {
    return StudentPlanHistory.update(
      { status: PlanHistoryStatus.CANCELLED },
      {
        where: { studentId, status: PlanHistoryStatus.ACTIVE },
        transaction,
      },
    );
  },

  findByStudentId(studentId: string) {
    return StudentPlanHistory.findAll({
      where: { studentId },
      include: [{ model: Plan, as: "plan" }],
      order: [["created_at", "DESC"]],
    });
  },
};
