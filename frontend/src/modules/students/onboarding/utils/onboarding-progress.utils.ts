import type { BodyMeasurement, FitnessGoal } from "@/lib/types/entities";

import type { OnboardingPhaseId } from "./onboarding-labels";

export interface OnboardingProgressState {
  currentPhase: OnboardingPhaseId;
  completedPhases: OnboardingPhaseId[];
  progressPercent: number;
  isComplete: boolean;
}

export function deriveOnboardingProgress({
  personalInfoCompleted,
  bodyMeasurements,
  fitnessGoal,
  onboardingCompleted,
}: {
  personalInfoCompleted: boolean;
  bodyMeasurements: BodyMeasurement[];
  fitnessGoal: FitnessGoal | null | undefined;
  onboardingCompleted: boolean;
}): OnboardingProgressState {
  const hasMeasurements = bodyMeasurements.length > 0;
  const hasFitnessGoal = Boolean(fitnessGoal);

  const completedPhases: OnboardingPhaseId[] = [];

  if (personalInfoCompleted) {
    completedPhases.push("personal-info");
  }

  if (hasMeasurements) {
    completedPhases.push("body-measurements");
  }

  if (hasFitnessGoal) {
    completedPhases.push("fitness-goals");
  }

  let currentPhase: OnboardingPhaseId = "personal-info";

  if (!personalInfoCompleted) {
    currentPhase = "personal-info";
  } else if (!hasMeasurements) {
    currentPhase = "body-measurements";
  } else if (!hasFitnessGoal) {
    currentPhase = "fitness-goals";
  } else {
    currentPhase = "fitness-goals";
  }

  const totalPhases = 3;
  const progressPercent = Math.round((completedPhases.length / totalPhases) * 100);

  return {
    currentPhase,
    completedPhases,
    progressPercent: onboardingCompleted ? 100 : progressPercent,
    isComplete: onboardingCompleted,
  };
}
