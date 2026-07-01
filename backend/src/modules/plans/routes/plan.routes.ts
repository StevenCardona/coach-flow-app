import { Router } from "express";

import { paginationQuerySchema } from "../../../helpers/pagination.validation";
import {
  asyncHandler,
  requireCoach,
  validate,
} from "../../../middleware";
import { planController } from "../controllers/plan.controller";
import {
  createPlanSchema,
  updatePlanSchema,
} from "../helpers/plan.validation";

const router = Router();

router.use(requireCoach);

router.post(
  "/",
  validate(createPlanSchema),
  asyncHandler(planController.create),
);

router.get(
  "/",
  validate(paginationQuerySchema, "query"),
  asyncHandler(planController.list),
);

router.get("/:id", asyncHandler(planController.getById));

router.patch(
  "/:id",
  validate(updatePlanSchema),
  asyncHandler(planController.update),
);

router.delete("/:id", asyncHandler(planController.remove));

export default router;
