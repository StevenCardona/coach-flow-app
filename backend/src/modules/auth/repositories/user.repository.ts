import type { Transaction } from "sequelize";

import { User } from "../models/user.model";
import type { CreateUserInput } from "../types/user.types";

export const userRepository = {
  create(data: CreateUserInput, transaction?: Transaction) {
    return User.create(data, { transaction });
  },

  findByClerkId(clerkId: string) {
    return User.findOne({ where: { clerkId } });
  },

  findByEmail(email: string) {
    return User.findOne({ where: { email } });
  },
};
