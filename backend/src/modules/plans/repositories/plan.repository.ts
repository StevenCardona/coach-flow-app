import type { Transaction, WhereOptions } from "sequelize";
import { Op } from "sequelize";

import {
  buildPaginatedResult,
  resolveSortColumn,
  resolveSortOrder,
} from "../../../helpers/pagination.util";
import type { PaginationQuery } from "../../../types/pagination.types";
import { Plan } from "../models/plan.model";
import type { CreatePlanInput, UpdatePlanInput } from "../types/plan.types";

const SORTABLE_COLUMNS: Record<string, string> = {
  name: "name",
  amount: "amount",
  durationDays: "duration_days",
  isActive: "is_active",
  created_at: "created_at",
};

export const planRepository = {
  create(data: CreatePlanInput, transaction?: Transaction) {
    return Plan.create(data, { transaction });
  },

  async findPaginatedByCoachId(coachId: string, query: PaginationQuery) {
    const where: WhereOptions = { coachId };

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.search) {
      const pattern = `%${query.search}%`;
      Object.assign(where, {
        [Op.or]: [
          { name: { [Op.iLike]: pattern } },
          { description: { [Op.iLike]: pattern } },
        ],
      });
    }

    const sortColumn = resolveSortColumn(
      query.sortBy,
      SORTABLE_COLUMNS,
      "created_at",
    );
    const sortOrder = resolveSortOrder(query.sortOrder);
    const offset = (query.page - 1) * query.pageSize;

    const { rows, count } = await Plan.findAndCountAll({
      where,
      order: [[sortColumn, sortOrder]],
      limit: query.pageSize,
      offset,
    });

    return buildPaginatedResult(rows, count, query);
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
