"use client";

import { UserCircle } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeader } from "@/components/cf";
import { Role } from "@/lib/types/entities";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";
import { cn } from "@/lib/utils";

import {
  ProfileSettingsNav,
  profileSettingsNavItems,
} from "./profile-settings-nav";

interface ProfileSettingsLayoutProps {
  children: ReactNode;
}

export function ProfileSettingsLayout({ children }: ProfileSettingsLayoutProps) {
  const { user } = useAuthUser();
  const isCoach = user?.role === Role.COACH;
  const showNav = profileSettingsNavItems.some(
    (item) => !item.coachOnly || user?.role === Role.COACH,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Perfil"
        subtitle={
          isCoach
            ? "Administra tu información y configuración"
            : "Administra tu información personal"
        }
        icon={UserCircle}
      />

      <div className="flex gap-0">
        {showNav ? (
          <div className="border-r border-border pr-6">
            <ProfileSettingsNav />
          </div>
        ) : null}
        <div className={cn("min-w-0 flex-1", showNav && "pl-6")}>{children}</div>
      </div>
    </div>
  );
}
