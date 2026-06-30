import type { Transaction, WhereOptions } from "sequelize";

import { Plan } from "../models/plan.model";
import type {
  CreatePlanInput,
  ListPlansFilters,
  UpdatePlanInput,
} from "../types/plan.types";

export const planRepository = {
  create(data: CreatePlanInput, transaction?: Transaction) {
    return Plan.create(data, { transaction });
  },

  findByCoachId(coachId: string, filters?: ListPlansFilters) {
    const where: WhereOptions = { coachId };

    if (filters?.activeOnly) {
      where.isActive = true;
    }

    return Plan.findAll({
      where,
      order: [["created_at", "DESC"]],
    });
  },

  findByCoachAndId(coachId: string, planId: string) {
    return Plan.findOne({ where: { id: planId, coachId } });
  },

  updateById(
    planId: string,
    data: UpdatePlanInput,
    transaction?: Transaction,
  ) {
    return Plan.update(data, { where: { id: planId }, transaction });
  },

  setActive(planId: string, isActive: boolean, transaction?: Transaction) {
    return Plan.update(
      { isActive },
      { where: { id: planId }, transaction },
    );
  },
};
