import { Dumbbell } from "lucide-react";

import { CfSkeleton, PageHeader } from "@/components/cf";

export function RoutinesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Rutinas"
        subtitle="Crea y asigna planes de entrenamiento"
        icon={Dumbbell}
      />
      <CfSkeleton variant="page" />
    </div>
  );
}
