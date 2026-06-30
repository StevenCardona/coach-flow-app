"use client";

import { SignUp } from "@clerk/nextjs";

export function SignUpForm() {
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      forceRedirectUrl="/dashboard"
    />
  );
}
