import { Router } from "express";

import {
  asyncHandler,
  requireClerkAuth,
  validate,
} from "../../../middleware";
import { authController } from "../controllers/auth.controller";
import { registerCoachSchema } from "../helpers/auth.validation";

const router = Router();

router.post(
  "/register/coach",
  requireClerkAuth,
  validate(registerCoachSchema),
  asyncHandler(authController.registerCoach),
);

export default router;
