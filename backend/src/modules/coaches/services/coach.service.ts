import type { Transaction } from "sequelize";

import { coachRepository } from "../repositories/coach.repository";
import type { CreateCoachInput } from "../types/coach.types";

export const coachService = {
  createCoach(input: CreateCoachInput, transaction?: Transaction) {
    return coachRepository.create(input, transaction);
  },

  getByUserId(userId: string) {
    return coachRepository.findByUserId(userId);
  },
};
