"use client";

import { useQuery } from "@tanstack/react-query";

import { getStudentById, getStudents } from "../../apis/students";
import { studentKeys } from "./keys";

export function useStudentsQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: studentKeys.list(),
    queryFn: getStudents,
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
