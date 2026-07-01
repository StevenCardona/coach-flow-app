"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { routeLabels } from "@/layouts/config/navigation";
import { cn } from "@/lib/utils";

function resolveBreadcrumbs(pathname: string) {
  const crumbs: { href: string; label: string }[] = [];

  if (pathname !== "/dashboard") {
    crumbs.push({ href: "/dashboard", label: "Dashboard" });
  }

  if (pathname.startsWith("/profile/plans")) {
    crumbs.push({ href: "/profile", label: routeLabels["/profile"] });
    crumbs.push({ href: "/profile/plans", label: routeLabels["/profile/plans"] });

    if (pathname.endsWith("/new")) {
      crumbs.push({
        href: pathname,
        label: routeLabels["/profile/plans/new"],
      });
    } else if (pathname.includes("/edit")) {
      crumbs.push({ href: pathname, label: "Editar plan" });
    }

    return crumbs;
  }

  const currentLabel = routeLabels[pathname] ?? "Página";
  crumbs.push({ href: pathname, label: currentLabel });

  return crumbs;
}

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = resolveBreadcrumbs(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-body-sm"
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <Fragment key={`${crumb.href}-${index}`}>
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
