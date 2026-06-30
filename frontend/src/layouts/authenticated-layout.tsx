"use client";

import type { ReactNode } from "react";

import { useAxiosAuth } from "@/modules/auth/hooks/use-axios-auth";

import { AppFooter } from "./components/app-footer";
import { AppHeader } from "./components/app-header";
import { AppSidebar } from "./components/app-sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  useAxiosAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
        <AppFooter />
      </div>
    </div>
  );
}
