"use client";

import { LayoutDashboard } from "lucide-react";

import { CfSkeleton, PageHeader } from "@/components/cf";
import { Role } from "@/lib/types/entities";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";

export function DashboardPage() {
  const { isLoading, user } = useAuthUser();

  const isStudent = user?.role === Role.STUDENT;

  const title = isStudent ? "Mi panel" : "Dashboard";
  const subtitle = isStudent
    ? "Resumen de tu progreso y actividad"
    : "Resumen general de tu actividad como coach";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <CfSkeleton className="h-16 w-full max-w-xl" />
        <CfSkeleton variant="page" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        subtitle={subtitle}
        icon={LayoutDashboard}
      />
      <CfSkeleton variant="page" />
    </div>
  );
}
