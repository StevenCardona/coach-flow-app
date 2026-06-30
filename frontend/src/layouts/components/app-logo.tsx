import { Activity } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface AppLogoProps {
  collapsed?: boolean;
}

export function AppLogo({ collapsed = false }: AppLogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "flex items-center gap-2.5 transition-opacity hover:opacity-90",
        collapsed && "justify-center",
      )}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
        <Activity className="size-5 text-primary" strokeWidth={2.5} />
      </div>
      {!collapsed && (
        <span className="font-display text-lg font-bold tracking-tight text-white">
          CoachFlow
        </span>
      )}
    </Link>
  );
}
