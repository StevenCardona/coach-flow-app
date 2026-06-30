import { UserCircle } from "lucide-react";

import { CfSkeleton, PageHeader } from "@/components/cf";

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Perfil"
        subtitle="Administra tu información personal y preferencias"
        icon={UserCircle}
      />
      <CfSkeleton variant="form" fields={5} />
    </div>
  );
}
