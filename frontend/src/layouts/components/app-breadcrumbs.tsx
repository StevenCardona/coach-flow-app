"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { routeLabels } from "@/layouts/config/navigation";
import { cn } from "@/lib/utils";

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const currentLabel = routeLabels[pathname] ?? "Página";

  const crumbs: { href: string; label: string }[] = [];

  if (pathname !== "/dashboard") {
    crumbs.push({ href: "/dashboard", label: "Dashboard" });
  }

  crumbs.push({ href: pathname, label: currentLabel });

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-body-sm"
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <Fragment key={crumb.href}>
            {index > 0 && (
              <span className="text-muted-foreground/60" aria-hidden="true">
                /
              </span>
            )}
            {isLast ? (
              <span className={cn("font-medium text-foreground")}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
