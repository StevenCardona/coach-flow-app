import type { NextFunction, Request, Response } from "express";

import { resolveAuthContext } from "../helpers/auth-context.helper";
import { Role } from "../types";
import { AppError } from "../types/error";

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    await resolveAuthContext(req);
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
    await resolveAuthContext(req);

    if (req.user!.role !== Role.COACH) {
      return next(new AppError(403, "No autorizado para este recurso"));
    }

    if (!req.coach) {
      return next(new AppError(403, "Perfil de coach no encontrado"));
    }

    if (!req.coach.isActive) {
      return next(new AppError(403, "Coach inactivo"));
    }

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
    await resolveAuthContext(req);

    if (req.user!.role !== Role.STUDENT) {
      return next(new AppError(403, "No autorizado para este recurso"));
    }

    if (!req.student) {
      return next(new AppError(403, "Perfil de estudiante no encontrado"));
    }

    if (!req.student.isActive) {
      return next(new AppError(403, "Estudiante inactivo"));
    }

    next();
  } catch (error) {
    next(error);
  }
};
