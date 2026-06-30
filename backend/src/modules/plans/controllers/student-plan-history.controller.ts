import type { Request, Response } from "express";

import { studentPlanHistoryService } from "../services/student-plan-history.service";
import type { AssignPlanBody } from "../helpers/student-plan-history.validation";

export const studentPlanHistoryController = {
  async assign(req: Request, res: Response) {
    const body = req.body as AssignPlanBody;
    const history = await studentPlanHistoryService.assignPlan({
      coachId: req.coach!.id,
      userId: req.user!.id,
      studentId: req.params.studentId as string,
      planId: body.planId,
      startDate: body.startDate,
      endDate: body.endDate ?? undefined,
      notes: body.notes ?? null,
    });

    res.success(history, "Plan asignado al estudiante", 201);
  },

  async list(req: Request, res: Response) {
    const histories = await studentPlanHistoryService.listByStudent(
      req.coach!.id,
      req.params.studentId as string,
    );

    res.success(histories, "Historial de planes obtenido");
  },
};
