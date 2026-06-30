import { Router } from "express";

import {
  asyncHandler,
  requireCoach,
  validate,
} from "../../../middleware";
import { studentController } from "../controllers/student.controller";
import { createStudentSchema } from "../helpers/student.validation";

const router = Router();

router.use(requireCoach);

router.post(
  "/",
  validate(createStudentSchema),
  asyncHandler(studentController.create),
);

router.get("/", asyncHandler(studentController.list));

router.get("/:id", asyncHandler(studentController.getById));

router.patch("/:id/deactivate", asyncHandler(studentController.deactivate));

router.delete("/:id", asyncHandler(studentController.remove));

export default router;
