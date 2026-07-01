import { Router } from "express";

import {
  asyncHandler,
  requireCoach,
  validate,
} from "../../../middleware";
import { paginationQuerySchema } from "../../../helpers/pagination.validation";
import { studentController } from "../controllers/student.controller";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../helpers/student.validation";

const router = Router();

router.use(requireCoach);

router.post(
  "/",
  validate(createStudentSchema),
  asyncHandler(studentController.create),
);

router.get(
  "/",
  validate(paginationQuerySchema, "query"),
  asyncHandler(studentController.list),
);

router.get("/stats", asyncHandler(studentController.stats));

router.get("/:id", asyncHandler(studentController.getById));

router.patch(
  "/:id",
  validate(updateStudentSchema),
  asyncHandler(studentController.update),
);

router.patch("/:id/deactivate", asyncHandler(studentController.deactivate));

router.delete("/:id", asyncHandler(studentController.remove));

export default router;
