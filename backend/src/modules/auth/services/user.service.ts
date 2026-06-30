import type { Transaction } from "sequelize";

import { AppError } from "../../../types/error";
import { userRepository } from "../repositories/user.repository";
import type { CreateUserInput } from "../types/user.types";

export const userService = {
  async getByClerkId(clerkId: string) {
    return userRepository.findByClerkId(clerkId);
  },

  async getByEmail(email: string) {
    return userRepository.findByEmail(email);
  },

  async createUser(input: CreateUserInput, transaction?: Transaction) {
    const existingByClerkId = await userRepository.findByClerkId(input.clerkId);

    if (existingByClerkId) {
      throw new AppError(409, "El usuario ya está registrado");
    }

    const existingByEmail = await userRepository.findByEmail(input.email);

    if (existingByEmail) {
      throw new AppError(409, "El email ya está registrado");
    }

    return userRepository.create(input, transaction);
  },
};
