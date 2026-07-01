import type { Request, Response } from "express";

import { authService } from "../services/auth.service";
import type {
  ChangePasswordBody,
  LoginBody,
  RegisterBody,
} from "../helpers/auth.validation";

export const authController = {
  async login(req: Request, res: Response) {
    const body = req.body as LoginBody;
    const result = await authService.login(body);

    res.success(result, "Inicio de sesión exitoso");
  },

  async register(req: Request, res: Response) {
    const body = req.body as RegisterBody;
    const result = await authService.register(body);

    res.success(result, "Coach registrado", 201);
  },

  async changePassword(req: Request, res: Response) {
    const body = req.body as ChangePasswordBody;
    const result = await authService.changePassword(
      req.user!.id,
      req.user!.email,
      body,
    );

    res.success(result, "Contraseña actualizada");
  },
};
