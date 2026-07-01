import { Router } from "express";

import {
  asyncHandler,
  requireCoach,
  validate,
} from "../../../middleware";
import { studentPlanHistoryController } from "../controllers/student-plan-history.controller";
import { assignPlanSchema } from "../helpers/student-plan-history.validation";

const router = Router({ mergeParams: true });

router.use(requireCoach);

router.post(
  "/",
  validate(assignPlanSchema),
  asyncHandler(studentPlanHistoryController.assign),
);

router.get("/", asyncHandler(studentPlanHistoryController.list));

export default router;
