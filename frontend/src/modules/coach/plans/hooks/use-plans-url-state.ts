"use client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import type { StatusFilterValue } from "@/components/cf";
import type { PaginationParams, SortOrder } from "@/lib/types/pagination.types";

const FILTER_KEYS = [
  "page",
  "pageSize",
  "search",
  "isActive",
  "sortBy",
  "sortOrder",
] as const;

const PLANS_BASE_PATH = "/profile/plans";

function buildFilterQueryString(searchParams: URLSearchParams) {
  const params = new URLSearchParams();

  for (const key of FILTER_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

function parseStatusFilter(value: string | null): StatusFilterValue {
  if (value === "true") {
    return "active";
  }

  if (value === "false") {
    return "inactive";
  }

  return "all";
}

function statusFilterToParam(value: StatusFilterValue): string | undefined {
  if (value === "active") {
    return "true";
  }

  if (value === "inactive") {
    return "false";
  }

  return undefined;
}

export function usePlansUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams<{ id?: string }>();

  const filterQuery = React.useMemo(
    () => buildFilterQueryString(searchParams),
    [searchParams],
  );

  const listParams = React.useMemo<PaginationParams>(() => {
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "10");
    const search = searchParams.get("search") ?? undefined;
    const sortBy = searchParams.get("sortBy") ?? "name";
    const sortOrder = (searchParams.get("sortOrder") as SortOrder | null) ?? "asc";
    const isActiveParam = searchParams.get("isActive");

    return {
      page: Number.isFinite(page) && page > 0 ? page : 1,
      pageSize: Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10,
      search: search || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      isActive:
        isActiveParam === "true"
          ? true
          : isActiveParam === "false"
            ? false
            : undefined,
    };
  }, [searchParams]);

  const statusFilter = React.useMemo(
    () => parseStatusFilter(searchParams.get("isActive")),
    [searchParams],
  );

  const isCreateOpen = pathname.endsWith(`${PLANS_BASE_PATH}/new`);
  const editPlanId = pathname.includes("/edit") ? (params.id ?? "") : "";
  const isEditOpen = Boolean(editPlanId);

  const updateFilters = React.useCallback(
    (updates: Partial<PaginationParams> & { statusFilter?: StatusFilterValue }) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      const assignNumber = (key: string, value?: number) => {
        if (value === undefined) {
          nextParams.delete(key);
          return;
        }
        nextParams.set(key, String(value));
      };

      const assignString = (key: string, value?: string) => {
        if (!value) {
          nextParams.delete(key);
          return;
        }
        nextParams.set(key, value);
      };

      if (updates.page !== undefined) {
        assignNumber("page", updates.page);
      }

      if (updates.pageSize !== undefined) {
        assignNumber("pageSize", updates.pageSize);
      }

      if (updates.search !== undefined) {
        assignString("search", updates.search);
      }

      if (updates.sortBy !== undefined) {
        assignString("sortBy", updates.sortBy);
      }

      if (updates.sortOrder !== undefined) {
        assignString("sortOrder", updates.sortOrder);
      }

      if ("isActive" in updates) {
        if (updates.isActive === undefined) {
          nextParams.delete("isActive");
        } else {
          nextParams.set("isActive", String(updates.isActive));
        }
      }

      if (updates.statusFilter !== undefined) {
        const statusParam = statusFilterToParam(updates.statusFilter);
        if (statusParam) {
          nextParams.set("isActive", statusParam);
        } else {
          nextParams.delete("isActive");
        }
        nextParams.set("page", "1");
      }

      const query = nextParams.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const openCreate = React.useCallback(() => {
    router.push(`${PLANS_BASE_PATH}/new${filterQuery}`);
  }, [filterQuery, router]);

  const openEdit = React.useCallback(
    (planId: string) => {
      router.push(`${PLANS_BASE_PATH}/${planId}/edit${filterQuery}`);
    },
    [filterQuery, router],
  );

  const closeAction = React.useCallback(() => {
    router.push(`${PLANS_BASE_PATH}${filterQuery}`);
  }, [filterQuery, router]);

  return {
    listParams,
    statusFilter,
    isCreateOpen,
    isEditOpen,
    editPlanId,
    updateFilters,
    openCreate,
    openEdit,
    closeAction,
  };
}
