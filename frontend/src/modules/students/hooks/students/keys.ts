import type { PaginationParams } from "@/lib/types/pagination.types";

export const studentKeys = {
  all: ["students"] as const,
  lists: () => [...studentKeys.all, "list"] as const,
  list: (params?: PaginationParams) =>
    [...studentKeys.lists(), params ?? {}] as const,
  stats: () => [...studentKeys.all, "stats"] as const,
  details: () => [...studentKeys.all, "detail"] as const,
  detail: (id: string) => [...studentKeys.details(), id] as const,
};
