"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  bottomNavItems,
  mainNavItems,
  type NavItem,
} from "@/layouts/config/navigation";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/stores/app-context";
import { cn } from "@/lib/utils";

import { AppLogo } from "./app-logo";

function isNavItemActive(href: string, pathname: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = isNavItemActive(item.href, pathname);
  const isProfile = item.variant === "profile";
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-sm font-medium transition-colors",
        collapsed && "justify-center px-2",
        active && !isProfile && "bg-primary text-primary-foreground",
        active &&
          isProfile &&
          "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
        !active &&
          !isProfile &&
          "text-white/70 hover:bg-white/10 hover:text-white",
        !active &&
          isProfile &&
          "text-amber-400/70 hover:bg-amber-500/10 hover:text-amber-400",
      )}
    >
      <Icon className="size-5 shrink-0" strokeWidth={1.75} />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const {
    isSidebarOpen,
    isSidebarCollapsed,
    toggleSidebarCollapsed,
    setIsSidebarOpen,
    isMobile,
  } = useAppContext();

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile, setIsSidebarOpen]);

  const collapsed = isSidebarCollapsed && !isMobile;
  const showOverlay = isMobile && isSidebarOpen;

  return (
    <>
      {showOverlay && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-cf-navy transition-all duration-300 lg:static lg:z-auto",
          collapsed ? "w-[4.5rem]" : "w-60",
          isMobile && !isSidebarOpen && "-translate-x-full",
          isMobile && isSidebarOpen && "translate-x-0",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-3">
          <AppLogo collapsed={collapsed} />
          {!isMobile && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleSidebarCollapsed}
              className="size-8 shrink-0 text-white/50 hover:bg-white/10 hover:text-white"
              aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </Button>
          )}
        </div>

        <nav className="shrink-0 flex flex-col gap-1 p-3">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={isMobile ? () => setIsSidebarOpen(false) : undefined}
            />
          ))}
        </nav>

        <div className="flex-1" />

        <div className="shrink-0 border-t border-white/10 p-3">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={isMobile ? () => setIsSidebarOpen(false) : undefined}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
