import type { Request, Response } from "express";

import { planService } from "../services/plan.service";
import type {
  CreatePlanBody,
  UpdatePlanBody,
} from "../helpers/plan.validation";

export const planController = {
  async create(req: Request, res: Response) {
    const body = req.body as CreatePlanBody;
    const plan = await planService.createPlan(req.coach!.id, {
      name: body.name,
      description: body.description ?? null,
      amount: String(body.amount),
      durationDays: body.durationDays,
      isVirtual: body.isVirtual,
    });

    res.success(plan, "Plan creado", 201);
  },

  async list(req: Request, res: Response) {
    const activeOnly = req.query.active === "true";
    const plans = await planService.listByCoach(req.coach!.id, { activeOnly });

    res.success(plans, "Planes obtenidos");
  },

  async getById(req: Request, res: Response) {
    const plan = await planService.getByCoachAndId(
      req.coach!.id,
      req.params.id as string,
    );

    res.success(plan, "Plan obtenido");
  },

  async update(req: Request, res: Response) {
    const body = req.body as UpdatePlanBody;
    const plan = await planService.updatePlan(
      req.coach!.id,
      req.params.id as string,
      body,
    );

    res.success(plan, "Plan actualizado");
  },

  async remove(req: Request, res: Response) {
    const plan = await planService.deactivatePlan(
      req.coach!.id,
      req.params.id as string,
    );

    res.success(plan, "Plan desactivado");
  },
};
