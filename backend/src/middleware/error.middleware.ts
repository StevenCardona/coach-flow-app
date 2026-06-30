import type { NextFunction, Request, Response } from "express";
import {
  ValidationError,
  UniqueConstraintError,
} from "sequelize";

import { NODE_ENV } from "../config/env";
import { AppError } from "../types/error";

const isClerkAuthError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "ClerkAPIResponseError" ||
    error.message.toLowerCase().includes("unauthenticated")
  );
};

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

  if (isClerkAuthError(err)) {
    return res.error("No autenticado", 401);
  }

  if (err instanceof ValidationError) {
    const messages = err.errors.map((validationError) => validationError.message);

    return res.error("Error de validación", 400, messages);
  }

  if (err instanceof UniqueConstraintError) {
    return res.error("Recurso duplicado", 409);
  }

  const message =
    NODE_ENV === "development" && err instanceof Error
      ? err.message
      : "Error interno del servidor";

  return res.error(message, 500);
};
