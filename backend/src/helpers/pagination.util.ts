import type {
  PaginatedResult,
  PaginationMeta,
  PaginationQuery,
  SortOrder,
} from "../types/pagination.types";
import type { PaginationQueryInput } from "./pagination.validation";

export function parsePaginationQuery(
  input: PaginationQueryInput,
): PaginationQuery {
  return {
    page: input.page,
    pageSize: input.pageSize,
    search: input.search || undefined,
    sortBy: input.sortBy || undefined,
    sortOrder: input.sortOrder,
    isActive: input.isActive,
  };
}

export function buildPaginationMeta(
  total: number,
  page: number,
  pageSize: number,
): PaginationMeta {
  return {
    page,
    pageSize,
    total,
    totalPages: total === 0 ? 0 : Math.ceil(total / pageSize),
  };
}

export function buildPaginatedResult<T>(
  items: T[],
  total: number,
  query: Pick<PaginationQuery, "page" | "pageSize">,
): PaginatedResult<T> {
  return {
    items,
    meta: buildPaginationMeta(total, query.page, query.pageSize),
  };
}

export function resolveSortColumn(
  sortBy: string | undefined,
  allowedColumns: Record<string, string>,
  defaultColumn: string,
): string {
  if (!sortBy) {
    return defaultColumn;
  }

  return allowedColumns[sortBy] ?? defaultColumn;
}

export function resolveSortOrder(sortOrder: SortOrder): "ASC" | "DESC" {
  return sortOrder === "asc" ? "ASC" : "DESC";
}
