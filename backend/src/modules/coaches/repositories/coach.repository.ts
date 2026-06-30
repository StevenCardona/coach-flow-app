import type { Transaction } from "sequelize";

import { Coach } from "../models/coach.model";
import type { CreateCoachInput } from "../types/coach.types";

export const coachRepository = {
  create(data: CreateCoachInput, transaction?: Transaction) {
    return Coach.create(data, { transaction });
  },

  findByUserId(userId: string) {
    return Coach.findOne({ where: { userId } });
  },
};
