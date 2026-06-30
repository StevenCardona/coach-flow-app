import {
  Dumbbell,
  LayoutDashboard,
  UserCircle,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type NavItemVariant = "default" | "profile";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  variant?: NavItemVariant;
}

export const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Alumnos", icon: Users },
  { href: "/routines", label: "Rutinas", icon: Dumbbell },
  { href: "/nutrition", label: "Nutrición", icon: UtensilsCrossed },
];

export const bottomNavItems: NavItem[] = [
  {
    href: "/profile",
    label: "Perfil",
    icon: UserCircle,
    variant: "profile",
  },
];

export const allNavItems: NavItem[] = [...mainNavItems, ...bottomNavItems];

export const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/students": "Alumnos",
  "/routines": "Rutinas",
  "/nutrition": "Nutrición",
  "/profile": "Perfil",
};
