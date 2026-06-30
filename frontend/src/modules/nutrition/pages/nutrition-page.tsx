import { Apple } from "lucide-react";

import { CfSkeleton, PageHeader } from "@/components/cf";

export function NutritionPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nutrición"
        subtitle="Gestiona planes alimenticios para tus alumnos"
        icon={Apple}
      />
      <CfSkeleton variant="page" />
    </div>
  );
}
