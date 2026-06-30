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
  "/me/onboarding/personal-info",
  validate(createPersonalInfoSchema),
  asyncHandler(studentOnboardingController.createPersonalInfo),
);

router.put(
  "/me/onboarding/personal-info",
  validate(updatePersonalInfoSchema),
  asyncHandler(studentOnboardingController.updatePersonalInfo),
);

router.get(
  "/me/onboarding/personal-info",
  asyncHandler(studentOnboardingController.getPersonalInfo),
);

router.post(
  "/me/onboarding/body-measurements",
  validate(createBodyMeasurementSchema),
  asyncHandler(studentOnboardingController.createBodyMeasurement),
);

router.put(
  "/me/onboarding/body-measurements/:id",
  validate(updateBodyMeasurementSchema),
  asyncHandler(studentOnboardingController.updateBodyMeasurement),
);

router.get(
  "/me/onboarding/body-measurements",
  asyncHandler(studentOnboardingController.listBodyMeasurements),
);

router.post(
  "/me/onboarding/fitness-goals",
  validate(createFitnessGoalSchema),
  asyncHandler(studentOnboardingController.createFitnessGoal),
);

router.put(
  "/me/onboarding/fitness-goals",
  validate(updateFitnessGoalSchema),
  asyncHandler(studentOnboardingController.updateFitnessGoal),
);

router.get(
  "/me/onboarding/fitness-goals",
  asyncHandler(studentOnboardingController.getFitnessGoal),
);

export default router;
