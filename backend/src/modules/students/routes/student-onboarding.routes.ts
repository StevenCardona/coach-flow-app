import { Router } from "express";

import {
  asyncHandler,
  requireStudent,
  validate,
} from "../../../middleware";
import { studentOnboardingController } from "../controllers/student-onboarding.controller";
import {
  createBodyMeasurementSchema,
  createFitnessGoalSchema,
  createPersonalInfoSchema,
  updateBodyMeasurementSchema,
  updateFitnessGoalSchema,
  updatePersonalInfoSchema,
} from "../helpers/student-onboarding.validation";

const router = Router();

router.use(requireStudent);

router.post(
  "/personal-info",
  validate(createPersonalInfoSchema),
  asyncHandler(studentOnboardingController.createPersonalInfo),
);

router.put(
  "/personal-info",
  validate(updatePersonalInfoSchema),
  asyncHandler(studentOnboardingController.updatePersonalInfo),
);

router.get(
  "/personal-info",
  asyncHandler(studentOnboardingController.getPersonalInfo),
);

router.post(
  "/body-measurements",
  validate(createBodyMeasurementSchema),
  asyncHandler(studentOnboardingController.createBodyMeasurement),
);

router.put(
  "/body-measurements/:id",
  validate(updateBodyMeasurementSchema),
  asyncHandler(studentOnboardingController.updateBodyMeasurement),
);

router.get(
  "/body-measurements",
  asyncHandler(studentOnboardingController.listBodyMeasurements),
);

router.post(
  "/fitness-goals",
  validate(createFitnessGoalSchema),
  asyncHandler(studentOnboardingController.createFitnessGoal),
);

router.put(
  "/fitness-goals",
  validate(updateFitnessGoalSchema),
  asyncHandler(studentOnboardingController.updateFitnessGoal),
);

router.get(
  "/fitness-goals",
  asyncHandler(studentOnboardingController.getFitnessGoal),
);

export default router;
