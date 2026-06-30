import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

import { User } from "../modules/auth/models/user.model";
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
