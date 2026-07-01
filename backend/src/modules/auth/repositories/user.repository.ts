import type { Transaction } from "sequelize";

import { User } from "../models/user.model";
import type { CreateUserInput } from "../types/user.types";

export const userRepository = {
  create(data: CreateUserInput, transaction?: Transaction) {
    return User.create(data, { transaction });
  },

  findByEmail(email: string) {
    return User.findOne({ where: { email } });
  },

  findByEmailWithPassword(email: string) {
    return User.scope("withPassword").findOne({ where: { email } });
  },

  findById(id: string, transaction?: Transaction) {
    return User.findByPk(id, { transaction });
  },

  findByIdWithPassword(id: string, transaction?: Transaction) {
    return User.scope("withPassword").findByPk(id, { transaction });
  },

  setActive(userId: string, isActive: boolean, transaction?: Transaction) {
    return User.update({ isActive }, { where: { id: userId }, transaction });
  },

  deleteById(userId: string, transaction?: Transaction) {
    return User.destroy({ where: { id: userId }, transaction });
  },

  updateProfile(
    userId: string,
    data: { name?: string },
    transaction?: Transaction,
  ) {
    return User.update(data, { where: { id: userId }, transaction });
  },

  updatePassword(
    userId: string,
    passwordHash: string,
    mustChangePassword: boolean,
    transaction?: Transaction,
  ) {
    return User.update(
      { passwordHash, mustChangePassword },
      { where: { id: userId }, transaction },
    );
  },
};
