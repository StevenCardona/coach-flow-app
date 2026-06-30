import type { NextFunction, Request, Response } from "express";

import { AppError } from "../types/error";

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new AppError(404, "Ruta no encontrada"));
};
