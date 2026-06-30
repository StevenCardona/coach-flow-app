import type { Request, Response } from "express";

import { authService } from "../services/auth.service";
import type { RegisterCoachBody } from "../helpers/auth.validation";

export const authController = {
  async registerCoach(req: Request, res: Response) {
    const body = req.body as RegisterCoachBody;
    const result = await authService.registerCoach(req.clerkId!, body);

    res.success(result, "Coach registrado", 201);
  },
};
