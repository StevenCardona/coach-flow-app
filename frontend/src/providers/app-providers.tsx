"use client";

import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/lib/stores/app-context";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";

interface AppProvidersProps {
  children: ReactNode;
  initialIsAuthenticated: boolean;
}

export function AppProviders({
  children,
  initialIsAuthenticated,
}: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider initialIsAuthenticated={initialIsAuthenticated}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
