import { Router } from "express";

import {
  asyncHandler,
  requireClerkAuth,
  validate,
} from "../../../middleware";
import { authController } from "../controllers/auth.controller";
import { registerSchema } from "../helpers/auth.validation";

const router = Router();

router.post(
  "/register",
  requireClerkAuth,
  validate(registerSchema),
  asyncHandler(authController.register),
);

export default router;
