import type { Transaction } from "sequelize";
import { Op } from "sequelize";

import { User } from "../models/user.model";
import type {
  CreatePendingUserInput,
  CreateUserInput,
} from "../types/user.types";

export const userRepository = {
  create(data: CreateUserInput, transaction?: Transaction) {
    return User.create(data, { transaction });
  },

  createPending(data: CreatePendingUserInput, transaction?: Transaction) {
    return User.create(
      {
        clerkId: null,
        email: data.email,
        name: data.name,
        role: data.role,
      },
      { transaction },
    );
  },

  findByClerkId(clerkId: string) {
    return User.findOne({ where: { clerkId } });
  },

  findByEmail(email: string) {
    return User.findOne({ where: { email } });
  },

  findPendingByEmail(email: string) {
    return User.findOne({
      where: {
        email,
        clerkId: { [Op.is]: null },
      },
    });
  },

  findById(id: string, transaction?: Transaction) {
    return User.findByPk(id, { transaction });
  },

  updateClerkId(userId: string, clerkId: string, transaction?: Transaction) {
    return User.update(
      { clerkId },
      { where: { id: userId }, transaction },
    );
  },

  setActive(userId: string, isActive: boolean, transaction?: Transaction) {
    return User.update({ isActive }, { where: { id: userId }, transaction });
  },

  deleteById(userId: string, transaction?: Transaction) {
    return User.destroy({ where: { id: userId }, transaction });
  },
};
