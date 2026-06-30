import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

import { User } from "../modules/auth/models/user.model";
import { coachService } from "../modules/coaches/services/coach.service";
import { studentService } from "../modules/students/services/student.service";
import { Role } from "../types";
import { AppError } from "../types/error";

export const requireClerkAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return next(new AppError(401, "No autenticado"));
  }

  req.clerkId = userId;
  next();
};

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return next(new AppError(401, "No autenticado"));
    }

    const user = await User.findOne({ where: { clerkId: userId } });

    if (!user) {
      return next(new AppError(404, "Usuario no encontrado"));
    }

    if (!user.isActive) {
      return next(new AppError(403, "Usuario inactivo"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "No autenticado"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "No autorizado para este recurso"));
    }

    next();
  };

export const requireCoach = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return next(new AppError(401, "No autenticado"));
    }

    const user = await User.findOne({ where: { clerkId: userId } });

    if (!user) {
      return next(new AppError(404, "Usuario no encontrado"));
    }

    if (!user.isActive) {
      return next(new AppError(403, "Usuario inactivo"));
    }

    if (user.role !== Role.COACH) {
      return next(new AppError(403, "No autorizado para este recurso"));
    }

    const coach = await coachService.getByUserId(user.id);

    if (!coach) {
      return next(new AppError(404, "Perfil de coach no encontrado"));
    }

    if (!coach.isActive) {
      return next(new AppError(403, "Coach inactivo"));
    }

    req.user = user;
    req.coach = coach;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireStudent = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return next(new AppError(401, "No autenticado"));
    }

    const user = await User.findOne({ where: { clerkId: userId } });

    if (!user) {
      return next(new AppError(404, "Usuario no encontrado"));
    }

    if (!user.isActive) {
      return next(new AppError(403, "Usuario inactivo"));
    }

    if (user.role !== Role.STUDENT) {
      return next(new AppError(403, "No autorizado para este recurso"));
    }

    const student = await studentService.getByUserId(user.id);

    if (!student) {
      return next(new AppError(404, "Perfil de estudiante no encontrado"));
    }

    if (!student.isActive) {
      return next(new AppError(403, "Estudiante inactivo"));
    }

    req.user = user;
    req.student = student;
    next();
  } catch (error) {
    next(error);
  }
};
