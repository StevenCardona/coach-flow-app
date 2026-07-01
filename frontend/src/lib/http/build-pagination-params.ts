import type { PaginationParams } from "@/lib/types/pagination.types";

export function buildPaginationParams(
  params?: PaginationParams,
): Record<string, string> {
  const query: Record<string, string> = {};

  if (!params) {
    return query;
  }

  if (params.page !== undefined) {
    query.page = String(params.page);
  }

  if (params.pageSize !== undefined) {
    query.pageSize = String(params.pageSize);
  }

  if (params.search) {
    query.search = params.search;
  }

  if (params.sortBy) {
    query.sortBy = params.sortBy;
  }

  if (params.sortOrder) {
    query.sortOrder = params.sortOrder;
  }

  if (params.isActive !== undefined) {
    query.isActive = String(params.isActive);
  }

  return query;
}
