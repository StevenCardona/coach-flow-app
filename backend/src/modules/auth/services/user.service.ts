import type { Transaction } from "sequelize";

import { AppError } from "../../../types/error";
import { userRepository } from "../repositories/user.repository";

import type { CreateUserInput } from "../types/user.types";

export const userService = {
  async getByEmail(email: string) {
    return userRepository.findByEmail(email);
  },

  async getByEmailWithPassword(email: string) {
    return userRepository.findByEmailWithPassword(email);
  },

  async getById(userId: string, transaction?: Transaction) {
    return userRepository.findById(userId, transaction);
  },

  async getByIdWithPassword(userId: string, transaction?: Transaction) {
    return userRepository.findByIdWithPassword(userId, transaction);
  },

  async createUser(input: CreateUserInput, transaction?: Transaction) {
    const existingByEmail = await userRepository.findByEmail(input.email);

    if (existingByEmail) {
      throw new AppError(409, "El email ya está registrado");
    }

    return userRepository.create(input, transaction);
  },

  async setActive(
    userId: string,
    isActive: boolean,
    transaction?: Transaction,
  ) {
    await userRepository.setActive(userId, isActive, transaction);

    return userRepository.findById(userId, transaction);
  },

  async updateProfile(
    userId: string,
    data: { name?: string },
    transaction?: Transaction,
  ) {
    await userRepository.updateProfile(userId, data, transaction);

    return userRepository.findById(userId, transaction);
  },

  async updatePassword(
    userId: string,
    passwordHash: string,
    mustChangePassword: boolean,
    transaction?: Transaction,
  ) {
    await userRepository.updatePassword(
      userId,
      passwordHash,
      mustChangePassword,
      transaction,
    );

    return userRepository.findById(userId, transaction);
  },

  async deleteUser(userId: string, transaction?: Transaction) {
    return userRepository.deleteById(userId, transaction);
  },
};
