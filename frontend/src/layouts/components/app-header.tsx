"use client";

import { LogOut } from "lucide-react";
import { HelpCircle, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/stores/app-context";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";
import { useAuthContext } from "@/providers/auth-provider";
import { useQueryClient } from "@tanstack/react-query";

import { authKeys } from "@/modules/auth/hooks/keys";

import { AppBreadcrumbs } from "./app-breadcrumbs";

export function AppHeader() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toggleSidebar } = useAppContext();
  const { logout } = useAuthContext();
  const { user } = useAuthUser();

  const handleLogout = () => {
    logout();
    queryClient.removeQueries({ queryKey: authKeys.me() });
    router.push("/sign-in");
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Abrir menú"
        >
          <Menu className="size-5" />
        </Button>
        <AppBreadcrumbs />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {user ? (
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user.name}
          </span>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled
          title="Próximamente"
          aria-label="Ayuda — Próximamente"
        >
          <HelpCircle className="size-5 text-muted-foreground" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <LogOut className="size-5" />
        </Button>
      </div>
    </header>
  );
}
