import { AppError } from "../../../types/error";
import type { PaginationQuery } from "../../../types/pagination.types";
import { planRepository } from "../repositories/plan.repository";
import type { UpdatePlanBody } from "../helpers/plan.validation";
import type { CreatePlanInput, UpdatePlanInput } from "../types/plan.types";

export const planService = {
  createPlan(coachId: string, input: Omit<CreatePlanInput, "coachId">) {
    return planRepository.create({
      coachId,
      ...input,
      amount: String(input.amount),
    });
  },

  listByCoach(coachId: string, query: PaginationQuery) {
    return planRepository.findPaginatedByCoachId(coachId, query);
  },

  async getByCoachAndId(coachId: string, planId: string) {
    const plan = await planRepository.findByCoachAndId(coachId, planId);

    if (!plan) {
      throw new AppError(404, "Plan no encontrado");
    }

    return plan;
  },

  async getActiveByCoachAndId(coachId: string, planId: string) {
    const plan = await this.getByCoachAndId(coachId, planId);

    if (!plan.isActive) {
      throw new AppError(400, "El plan no está activo");
    }

    return plan;
  },

  async updatePlan(
    coachId: string,
    planId: string,
    input: UpdatePlanBody,
  ) {
    const plan = await this.getByCoachAndId(coachId, planId);

    const updateData: UpdatePlanInput = {};

    if (input.name !== undefined) {
      updateData.name = input.name;
    }

    if (input.description !== undefined) {
      updateData.description = input.description;
    }

    if (input.amount !== undefined) {
      updateData.amount = String(input.amount);
    }

    if (input.durationDays !== undefined) {
      updateData.durationDays = input.durationDays;
    }

    if (input.isVirtual !== undefined) {
      updateData.isVirtual = input.isVirtual;
    }

    if (input.isActive !== undefined) {
      updateData.isActive = input.isActive;
    }

    await planRepository.updateById(plan.id, updateData);

    return plan.reload();
  },

  async deactivatePlan(coachId: string, planId: string) {
    const plan = await this.getByCoachAndId(coachId, planId);

    if (!plan.isActive) {
      throw new AppError(400, "El plan ya está inactivo");
    }

    await planRepository.setActive(plan.id, false);

    return plan.reload();
  },
};
