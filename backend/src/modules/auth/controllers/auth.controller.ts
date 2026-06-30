import type { Request, Response } from "express";

import { Role } from "../../../types";
import { authService } from "../services/auth.service";
import type { RegisterBody } from "../helpers/auth.validation";

export const authController = {
  async register(req: Request, res: Response) {
    const body = req.body as RegisterBody;
    const result = await authService.register(req.clerkId!, {
      role: body.role as Role,
      name: body.name,
      email: body.email,
    });

    const message =
      body.role === Role.COACH
        ? "Coach registrado"
        : "Estudiante registrado";

    res.success(result, message, 201);
  },
};
