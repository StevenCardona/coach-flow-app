import { SignInForm } from "@/modules/auth/components/sign-in-form";

export function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <SignInForm />
    </main>
  );
}
