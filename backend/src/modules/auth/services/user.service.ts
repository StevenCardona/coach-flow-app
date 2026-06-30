import type { Transaction } from "sequelize";
import { Role } from "../../../types";
import { AppError } from "../../../types/error";
import { userRepository } from "../repositories/user.repository";

import type {
  CreatePendingUserInput,
  CreateUserInput,
} from "../types/user.types";

export const userService = {
  async getByClerkId(clerkId: string) {
    return userRepository.findByClerkId(clerkId);
  },

  async getByEmail(email: string) {
    return userRepository.findByEmail(email);
  },

  async getById(userId: string, transaction?: Transaction) {
    return userRepository.findById(userId, transaction);
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

  async createPendingUser(
    input: CreatePendingUserInput,
    transaction?: Transaction,
  ) {
    const existingByEmail = await userRepository.findByEmail(input.email);

    if (existingByEmail) {
      throw new AppError(409, "El email ya está registrado");
    }

    return userRepository.createPending(input, transaction);
  },

  async completeRegistration(
    clerkId: string,
    email: string,
    transaction?: Transaction,
  ) {
    const existingByClerkId = await userRepository.findByClerkId(clerkId);

    if (existingByClerkId) {
      throw new AppError(409, "El usuario ya está registrado en Clerk");
    }

    const pendingUser = await userRepository.findPendingByEmail(email);

    if (!pendingUser) {
      throw new AppError(
        404,

        "No se encontró un pre-registro pendiente para este email",
      );
    }

    if (pendingUser.role !== Role.STUDENT) {
      throw new AppError(400, "El pre-registro no corresponde a un estudiante");
    }

    await userRepository.updateClerkId(pendingUser.id, clerkId, transaction);

    return userRepository.findById(pendingUser.id, transaction);
  },

  async setActive(
    userId: string,
    isActive: boolean,
    transaction?: Transaction,
  ) {
    await userRepository.setActive(userId, isActive, transaction);

    return userRepository.findById(userId, transaction);
  },

  async deleteUser(userId: string, transaction?: Transaction) {
    return userRepository.deleteById(userId, transaction);
  },
};
