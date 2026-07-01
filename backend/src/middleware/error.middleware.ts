import type { NextFunction, Request, Response } from "express";
import {
  ValidationError,
  UniqueConstraintError,
} from "sequelize";

import { AppError } from "../types/error";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (res.headersSent) {
    return;
  }

  if (err instanceof AppError) {
    return res.error(err.message, err.statusCode);
  }

  if (err instanceof ValidationError) {
    const messages = err.errors.map((validationError) => validationError.message);

    return res.error("Error de validación", 400, messages);
  }

  if (err instanceof UniqueConstraintError) {
    return res.error("Recurso duplicado", 409);
  }

  if (err instanceof Error) {
    console.error(err);
  } else {
    console.error("Unhandled error:", err);
  }

  return res.error("Error interno del servidor", 500);
};
