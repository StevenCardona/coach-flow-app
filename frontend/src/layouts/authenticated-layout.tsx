"use client";

import { UserButton } from "@clerk/nextjs";
import type { ReactNode } from "react";

import { useAxiosAuth } from "@/modules/auth/hooks/use-axios-auth";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  useAxiosAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-end px-4">
          <UserButton />
        </nav>
      </header>
      <main className="mx-auto max-w-7xl p-4">{children}</main>
    </div>
  );
}
