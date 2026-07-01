"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { BodyMeasurementsStep } from "../components/body-measurements-step";
import { FitnessGoalsStep } from "../components/fitness-goals-step";
import { PersonalInfoStep } from "../components/personal-info-step";
import { OnboardingProgress } from "../components/ui/onboarding-progress";
import { OnboardingShell } from "../components/ui/onboarding-shell";
import { OnboardingStepSkeleton } from "../components/ui/onboarding-step-skeleton";
import { useOnboardingGuard } from "../hooks/use-onboarding-guard";
import { useOnboardingProgress } from "../hooks/use-onboarding-progress";
import type { OnboardingPhaseId } from "../utils/onboarding-labels";
import { ONBOARDING_PHASES } from "../utils/onboarding-labels";

const NEXT_PHASE: Partial<Record<OnboardingPhaseId, OnboardingPhaseId>> = {
  "personal-info": "body-measurements",
  "body-measurements": "fitness-goals",
};

function getDisplayProgress(activePhase: OnboardingPhaseId, isComplete: boolean) {
  const phaseOrder = ONBOARDING_PHASES.map((phase) => phase.id);
  const activeIndex = phaseOrder.indexOf(activePhase);
  const completedPhases = phaseOrder.slice(0, activeIndex) as OnboardingPhaseId[];

  return {
    currentPhase: activePhase,
    completedPhases,
    progressPercent: isComplete
      ? 100
      : Math.round((completedPhases.length / phaseOrder.length) * 100),
  };
}

export function OnboardingPage() {
  const router = useRouter();
  const [activePhaseOverride, setActivePhaseOverride] =
    useState<OnboardingPhaseId | null>(null);
  const { shouldRender, isLoading: isGuardLoading } = useOnboardingGuard({
    mode: "require-incomplete",
  });
  const {
    isLoading: isProgressLoading,
    progress,
    personalInfoQuery,
    bodyMeasurementsQuery,
    fitnessGoalQuery,
    student,
  } = useOnboardingProgress();

  const isLoading = isGuardLoading || isProgressLoading;
  const activePhase = activePhaseOverride ?? progress.currentPhase;

  useEffect(() => {
    setActivePhaseOverride(null);
  }, [progress.currentPhase]);

  useEffect(() => {
    if (!isLoading && progress.isComplete) {
      router.replace("/dashboard");
    }
  }, [isLoading, progress.isComplete, router]);

  const handlePhaseComplete = (phase: OnboardingPhaseId) => {
    const nextPhase = NEXT_PHASE[phase];

    if (nextPhase) {
      setActivePhaseOverride(nextPhase);
    }
  };

  if (isLoading || !shouldRender) {
    return (
      <OnboardingShell
        progress={
          <div className="h-16 animate-pulse rounded-lg bg-muted" />
        }
      >
        <OnboardingStepSkeleton />
      </OnboardingShell>
    );
  }

  const existingMeasurement = bodyMeasurementsQuery.data?.[0] ?? null;
  const displayProgress = getDisplayProgress(activePhase, progress.isComplete);

  return (
    <OnboardingShell
      progress={
        <OnboardingProgress
          currentPhase={displayProgress.currentPhase}
          completedPhases={displayProgress.completedPhases}
          progressPercent={displayProgress.progressPercent}
        />
      }
    >
      {activePhase === "personal-info" ? (
        <PersonalInfoStep
          initialData={personalInfoQuery.data}
          isCompleted={student?.personalInfoCompleted ?? false}
          onComplete={() => handlePhaseComplete("personal-info")}
        />
      ) : null}

      {activePhase === "body-measurements" ? (
        <BodyMeasurementsStep
          existingMeasurement={existingMeasurement}
          onComplete={() => handlePhaseComplete("body-measurements")}
        />
      ) : null}

      {activePhase === "fitness-goals" ? (
        <FitnessGoalsStep
          initialData={fitnessGoalQuery.data}
          onComplete={() => handlePhaseComplete("fitness-goals")}
        />
      ) : null}
    </OnboardingShell>
  );
}
