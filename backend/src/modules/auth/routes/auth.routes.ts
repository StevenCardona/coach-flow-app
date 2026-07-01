import { Router } from "express";

import {
  asyncHandler,
  requireAuth,
  validate,
} from "../../../middleware";
import { authController } from "../controllers/auth.controller";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "../helpers/auth.validation";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login),
);

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register),
);

router.post(
  "/change-password",
  requireAuth,
  validate(changePasswordSchema),
  asyncHandler(authController.changePassword),
);

export default router;
