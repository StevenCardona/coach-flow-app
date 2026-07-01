"use client";

import { useQuery } from "@tanstack/react-query";

import { getBodyMeasurements } from "../apis/body-measurements";
import { getFitnessGoal } from "../apis/fitness-goals";
import { getPersonalInfo } from "../apis/personal-info";
import { onboardingKeys } from "./keys";

export function usePersonalInfoQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: onboardingKeys.personalInfo(),
    queryFn: getPersonalInfo,
    enabled: options?.enabled ?? true,
  });
}

export function useBodyMeasurementsQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: onboardingKeys.bodyMeasurements(),
    queryFn: getBodyMeasurements,
    enabled: options?.enabled ?? true,
  });
}

export function useFitnessGoalQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: onboardingKeys.fitnessGoal(),
    queryFn: getFitnessGoal,
    enabled: options?.enabled ?? true,
    retry: false,
  });
}
