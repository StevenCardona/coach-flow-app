export const onboardingKeys = {
  all: ["onboarding"] as const,
  personalInfo: () => [...onboardingKeys.all, "personal-info"] as const,
  bodyMeasurements: () =>
    [...onboardingKeys.all, "body-measurements"] as const,
  fitnessGoal: () => [...onboardingKeys.all, "fitness-goal"] as const,
};
