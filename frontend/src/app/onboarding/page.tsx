import { Suspense } from "react";

import { OnboardingStepSkeleton } from "@/modules/students/onboarding/components/ui/onboarding-step-skeleton";
import { OnboardingShell } from "@/modules/students/onboarding/components/ui/onboarding-shell";
import { OnboardingPage } from "@/modules/students/onboarding/pages/onboarding-page";

export default function Page() {
  return (
    <Suspense
      fallback={
        <OnboardingShell
          progress={
            <div className="h-16 animate-pulse rounded-lg bg-muted" />
          }
        >
          <OnboardingStepSkeleton />
        </OnboardingShell>
      }
    >
      <OnboardingPage />
    </Suspense>
  );
}
