import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { AppError } from "../types/error";

type ValidationSource = "body" | "query" | "params";

export const validate =
  (schema: ZodType, source: ValidationSource = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);

      return next(new AppError(400, `Datos inválidos: ${messages.join(", ")}`));
    }

    req[source] = result.data;
    next();
  };
