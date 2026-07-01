"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { PaginationParams } from "@/lib/types/pagination.types";

import { getStudentById, getStudents, getStudentsStats } from "../../apis/students";
import { studentKeys } from "./keys";

export function useStudentsQuery(
  params?: PaginationParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: studentKeys.list(params),
    queryFn: () => getStudents(params),
    placeholderData: keepPreviousData,
    enabled: options?.enabled ?? true,
  });
}

export function useStudentsStatsQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: studentKeys.stats(),
    queryFn: getStudentsStats,
    enabled: options?.enabled ?? true,
  });
}

export function useStudentQuery(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => getStudentById(id),
    enabled: (options?.enabled ?? true) && !!id,
  });
}
