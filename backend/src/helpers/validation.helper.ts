import type { Request } from "express";

import { AppError } from "../types/error";

export function getValidatedQuery<T>(req: Request): T {
  const query = req.validated?.query;

  if (query === undefined) {
    throw new AppError(500, "Query validada no disponible");
  }

  return query as T;
}
