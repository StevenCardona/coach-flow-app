import type { Transaction } from "sequelize";

import { FitnessGoal } from "../models/fitness-goal.model";
import type { CreateFitnessGoalInput } from "../types/student-onboarding.types";

export const fitnessGoalRepository = {
  create(data: CreateFitnessGoalInput, transaction?: Transaction) {
    return FitnessGoal.create(data, { transaction });
  },

  findByStudentId(studentId: string) {
    return FitnessGoal.findOne({ where: { studentId } });
  },

  updateByStudentId(
    studentId: string,
    data: Partial<CreateFitnessGoalInput>,
    transaction?: Transaction,
  ) {
    return FitnessGoal.update(data, { where: { studentId }, transaction });
  },
};
