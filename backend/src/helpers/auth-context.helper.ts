import type { Request } from "express";

import { verifyAccessToken } from "./jwt.helper";
import { User } from "../modules/auth/models/user.model";
import { coachService } from "../modules/coaches/services/coach.service";
import { studentService } from "../modules/students/services/student.service";
import { Role } from "../types";
import { AppError } from "../types/error";

export function getTokenFromRequest(req: Request): string | undefined {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();

    if (token) {
      return token;
    }
  }

  return undefined;
}

export async function resolveAuthContext(req: Request) {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new AppError(401, "No autenticado");
  }

  let payload;

  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError(401, "Token inválido o expirado");
  }

  const user = await User.findByPk(payload.sub);

  if (!user) {
    throw new AppError(404, "Usuario no encontrado");
  }

  if (!user.isActive) {
    throw new AppError(403, "Usuario inactivo");
  }

    if (user.role !== payload.role) {
      throw new AppError(401, "Token inválido");
    }

    if (user.mustChangePassword !== payload.mustChangePassword) {
      throw new AppError(401, "Token inválido");
    }

  req.user = user;

  if (user.role === Role.COACH) {
    const coach = await coachService.getByUserId(user.id);

    if (coach) {
      req.coach = coach;
    }
  }

  if (user.role === Role.STUDENT) {
    const student = await studentService.getByUserId(user.id);

    if (student) {
      req.student = student;
    }
  }

  return { user };
}
