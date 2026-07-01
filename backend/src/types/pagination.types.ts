export type SortOrder = "asc" | "desc";

export interface PaginationQuery {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder: SortOrder;
  isActive?: boolean;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}
