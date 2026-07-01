"use client";

import { CreditCard, UserCircle, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Role } from "@/lib/types/entities";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";
import { cn } from "@/lib/utils";

export interface ProfileSettingsNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  coachOnly?: boolean;
}

export const profileSettingsNavItems: ProfileSettingsNavItem[] = [
  {
    href: "/profile",
    label: "Perfil",
    icon: UserCircle,
  },
  {
    href: "/profile/plans",
    label: "Planes",
    icon: CreditCard,
    coachOnly: true,
  },
];

function isNavItemActive(href: string, pathname: string) {
  if (href === "/profile") {
    return pathname === "/profile";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ProfileSettingsNav() {
  const pathname = usePathname();
  const { user } = useAuthUser();

  const visibleItems = profileSettingsNavItems.filter(
    (item) => !item.coachOnly || user?.role === Role.COACH,
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Configuración del perfil" className="w-48 shrink-0 pr-6">
      <ul className="space-y-1">
        {visibleItems.map((item) => {
          const active = isNavItemActive(item.href, pathname);
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 border-l-2 py-2 pl-3 text-body-sm transition-colors",
                  active
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
