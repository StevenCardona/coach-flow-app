import { sequelize } from "../../../config/db/db";
import { signAccessToken } from "../../../helpers/jwt.helper";
import {
  comparePassword,
  hashPassword,
} from "../../../helpers/password.helper";
import { Role } from "../../../types";
import { AppError } from "../../../types/error";
import { coachService } from "../../coaches/services/coach.service";

import type {
  ChangePasswordBody,
  LoginBody,
  RegisterBody,
} from "../helpers/auth.validation";
import { userService } from "./user.service";

function buildAuthResponse(user: {
  id: string;
  email: string;
  name: string;
  role: Role;
  mustChangePassword: boolean;
  isActive: boolean;
  created_at?: Date;
  updated_at?: Date;
}) {
  const token = signAccessToken({
    sub: user.id,
    role: user.role,
    mustChangePassword: user.mustChangePassword,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      mustChangePassword: user.mustChangePassword,
      isActive: user.isActive,
    },
    token,
    mustChangePassword: user.mustChangePassword,
  };
}

export const authService = {
  async login(input: LoginBody) {
    const user = await userService.getByEmailWithPassword(input.email);

    if (!user) {
      throw new AppError(401, "Credenciales inválidas");
    }

    const isValid = await comparePassword(input.password, user.passwordHash);

    if (!isValid) {
      throw new AppError(401, "Credenciales inválidas");
    }

    if (!user.isActive) {
      throw new AppError(403, "Usuario inactivo");
    }

    return buildAuthResponse(user);
  },

  async register(input: RegisterBody) {
    if (input.role !== Role.COACH) {
      throw new AppError(400, "Solo los coaches pueden registrarse");
    }

    const passwordHash = await hashPassword(input.password);

    const result = await sequelize.transaction(async (transaction) => {
      const user = await userService.createUser(
        {
          email: input.email,
          name: input.name,
          passwordHash,
          mustChangePassword: false,
          role: Role.COACH,
        },
        transaction,
      );

      const coach = await coachService.createCoach(
        {
          userId: user.id,
          name: input.name,
          email: input.email,
        },
        transaction,
      );

      return { user, coach };
    });

    return buildAuthResponse(result.user);
  },

  async changePassword(userId: string, email: string, input: ChangePasswordBody) {
    const user = await userService.getByIdWithPassword(userId);

    if (!user) {
      throw new AppError(404, "Usuario no encontrado");
    }

    const isValid = await comparePassword(
      input.currentPassword,
      user.passwordHash,
    );

    if (!isValid) {
      throw new AppError(400, "La contraseña actual es incorrecta");
    }

    if (input.currentPassword === input.newPassword) {
      throw new AppError(
        400,
        "La nueva contraseña debe ser diferente a la actual",
      );
    }

    if (input.newPassword.toLowerCase() === email.toLowerCase()) {
      throw new AppError(
        400,
        "La nueva contraseña no puede ser igual al correo electrónico",
      );
    }

    const passwordHash = await hashPassword(input.newPassword);

    const updatedUser = await userService.updatePassword(
      userId,
      passwordHash,
      false,
    );

    if (!updatedUser) {
      throw new AppError(500, "No se pudo actualizar la contraseña");
    }

    const token = signAccessToken({
      sub: updatedUser.id,
      role: updatedUser.role,
      mustChangePassword: false,
    });

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        mustChangePassword: updatedUser.mustChangePassword,
        isActive: updatedUser.isActive,
      },
      token,
      mustChangePassword: false,
    };
  },
};
