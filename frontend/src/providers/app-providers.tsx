"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/lib/stores/app-context";
import { QueryProvider } from "@/providers/query-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
