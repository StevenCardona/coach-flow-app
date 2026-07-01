import { Suspense } from "react";

import { CfSkeleton } from "@/components/cf";
import { SignInForm } from "@/modules/auth/components/sign-in-form";

export function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Suspense
        fallback={<CfSkeleton className="h-96 w-full max-w-md rounded-xl" />}
      >
        <SignInForm />
      </Suspense>
    </main>
  );
}
