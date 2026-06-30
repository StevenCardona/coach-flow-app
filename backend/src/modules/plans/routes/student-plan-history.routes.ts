import { Router } from "express";

import {
  asyncHandler,
  requireCoach,
  validate,
} from "../../../middleware";
import { studentPlanHistoryController } from "../controllers/student-plan-history.controller";
import { assignPlanSchema } from "../helpers/student-plan-history.validation";

const router = Router();

router.use(requireCoach);

router.post(
  "/:studentId/plan-histories",
  validate(assignPlanSchema),
  asyncHandler(studentPlanHistoryController.assign),
);

router.get(
  "/:studentId/plan-histories",
  asyncHandler(studentPlanHistoryController.list),
);

export default router;
