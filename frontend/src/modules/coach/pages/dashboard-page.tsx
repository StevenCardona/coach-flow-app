import { LayoutDashboard } from "lucide-react";

import { CfSkeleton, PageHeader } from "@/components/cf";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Resumen general de tu actividad como coach"
        icon={LayoutDashboard}
      />
      <CfSkeleton variant="page" />
    </div>
  );
}
