"use client";

import { Role } from "@/lib/types/entities";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";

import { deriveOnboardingProgress } from "../utils/onboarding-progress.utils";
import type { OnboardingPhaseId } from "../utils/onboarding-labels";
import {
  useBodyMeasurementsQuery,
  useFitnessGoalQuery,
  usePersonalInfoQuery,
} from "./queries";

export function useOnboardingProgress() {
  const { user, isLoading: isAuthLoading } = useAuthUser();
  const isStudent = user?.role === Role.STUDENT;
  const student = user?.student ?? null;

  const personalInfoQuery = usePersonalInfoQuery({ enabled: isStudent });
  const bodyMeasurementsQuery = useBodyMeasurementsQuery({ enabled: isStudent });
  const fitnessGoalQuery = useFitnessGoalQuery({ enabled: isStudent });

  const isLoading =
    isAuthLoading ||
    (isStudent &&
      (personalInfoQuery.isPending ||
        bodyMeasurementsQuery.isPending ||
        fitnessGoalQuery.isPending));

  const progress = deriveOnboardingProgress({
    personalInfoCompleted:
      student?.personalInfoCompleted ??
      personalInfoQuery.data?.personalInfoCompleted ??
      false,
    bodyMeasurements: bodyMeasurementsQuery.data ?? [],
    fitnessGoal: fitnessGoalQuery.data,
    onboardingCompleted: student?.onboardingCompleted ?? false,
  });

  return {
    user,
    student,
    isStudent,
    isLoading,
    progress,
    personalInfoQuery,
    bodyMeasurementsQuery,
    fitnessGoalQuery,
  };
}

export type { OnboardingPhaseId };
