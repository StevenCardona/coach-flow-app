import type { NextFunction, Request, Response } from "express";

import type { ApiResponse } from "../types/response";

export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = function success<T>(
    data: T,
    message = "OK",
    statusCode = 200,
  ) {
    const body: ApiResponse<T> = {
      success: true,
      statusCode,
      message,
      data,
    };

    return this.status(statusCode).json(body);
  };

  res.error = function error(
    message: string,
    statusCode = 400,
    data: unknown = null,
  ) {
    const body: ApiResponse<unknown> = {
      success: false,
      statusCode,
      message,
      data,
    };

    return this.status(statusCode).json(body);
  };

  next();
};
