import {
  Dumbbell,
  LayoutDashboard,
  UserCircle,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import { Role, type Role as RoleType } from "@/lib/types/entities";

export type NavItemVariant = "default" | "profile";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: NavItemVariant;
}

export const coachMainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Alumnos", icon: Users },
  { href: "/routines", label: "Rutinas", icon: Dumbbell },
  { href: "/nutrition", label: "Nutrición", icon: UtensilsCrossed },
];

export const studentMainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export const bottomNavItems: NavItem[] = [
  {
    href: "/profile",
    label: "Perfil",
    icon: UserCircle,
    variant: "profile",
  },
];

/** @deprecated Use getNavItemsForRole instead */
export const mainNavItems = coachMainNavItems;

export function getMainNavItemsForRole(role: RoleType): NavItem[] {
  return role === Role.STUDENT ? studentMainNavItems : coachMainNavItems;
}

export function getNavItemsForRole(role: RoleType): NavItem[] {
  return [...getMainNavItemsForRole(role), ...bottomNavItems];
}

export const coachOnlyRoutePrefixes = [
  "/students",
  "/routines",
  "/nutrition",
  "/profile/plans",
];

export const allNavItems: NavItem[] = [...coachMainNavItems, ...bottomNavItems];

export const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/students": "Alumnos",
  "/routines": "Rutinas",
  "/nutrition": "Nutrición",
  "/profile": "Perfil",
  "/profile/plans": "Planes",
  "/profile/plans/new": "Crear plan",
};
