"use client";

import { UserButton } from "@clerk/nextjs";
import { HelpCircle, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/stores/app-context";

import { AppBreadcrumbs } from "./app-breadcrumbs";

export function AppHeader() {
  const { toggleSidebar } = useAppContext();

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
        <UserButton />
      </div>
    </header>
  );
}
