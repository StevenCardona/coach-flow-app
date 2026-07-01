"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createBodyMeasurement,
  updateBodyMeasurement,
} from "../apis/body-measurements";
import {
  createFitnessGoal,
  updateFitnessGoal,
} from "../apis/fitness-goals";
import {
  createPersonalInfo,
  updatePersonalInfo,
} from "../apis/personal-info";
import type {
  CreateBodyMeasurementRequest,
  CreateFitnessGoalRequest,
  CreatePersonalInfoRequest,
  UpdateBodyMeasurementRequest,
  UpdateFitnessGoalRequest,
  UpdatePersonalInfoRequest,
} from "../types/requests";
import { authKeys } from "@/modules/auth/hooks/keys";

import { onboardingKeys } from "./keys";

function invalidateOnboardingQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  phaseKey: readonly unknown[],
) {
  queryClient.invalidateQueries({ queryKey: phaseKey });
  queryClient.invalidateQueries({ queryKey: authKeys.me() });
}

export function useCreatePersonalInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePersonalInfoRequest) => createPersonalInfo(body),
    onSuccess: () => {
      invalidateOnboardingQueries(
        queryClient,
        onboardingKeys.personalInfo(),
      );
    },
  });
}

export function useUpdatePersonalInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdatePersonalInfoRequest) => updatePersonalInfo(body),
    onSuccess: () => {
      invalidateOnboardingQueries(
        queryClient,
        onboardingKeys.personalInfo(),
      );
    },
  });
}

export function useCreateBodyMeasurementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateBodyMeasurementRequest) =>
      createBodyMeasurement(body),
    onSuccess: () => {
      invalidateOnboardingQueries(
        queryClient,
        onboardingKeys.bodyMeasurements(),
      );
    },
  });
}

export function useUpdateBodyMeasurementMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateBodyMeasurementRequest;
    }) => updateBodyMeasurement(id, body),
    onSuccess: () => {
      invalidateOnboardingQueries(
        queryClient,
        onboardingKeys.bodyMeasurements(),
      );
    },
  });
}

export function useCreateFitnessGoalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateFitnessGoalRequest) => createFitnessGoal(body),
    onSuccess: () => {
      invalidateOnboardingQueries(queryClient, onboardingKeys.fitnessGoal());
    },
  });
}

export function useUpdateFitnessGoalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateFitnessGoalRequest) => updateFitnessGoal(body),
    onSuccess: () => {
      invalidateOnboardingQueries(queryClient, onboardingKeys.fitnessGoal());
    },
  });
}
