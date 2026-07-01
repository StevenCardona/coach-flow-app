"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createStudent,
  deactivateStudent,
  deleteStudent,
  updateStudent,
} from "../../apis/students";
import type {
  CreateStudentRequest,
  UpdateStudentRequest,
} from "../../types/requests";
import { studentKeys } from "./keys";

function invalidateStudentLists(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
  queryClient.invalidateQueries({ queryKey: studentKeys.stats() });
}

export function useCreateStudentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateStudentRequest) => createStudent(body),
    onSuccess: () => {
      invalidateStudentLists(queryClient);
    },
  });
}

export function useUpdateStudentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateStudentRequest }) =>
      updateStudent(id, body),
    onSuccess: (_data, variables) => {
      invalidateStudentLists(queryClient);
      queryClient.invalidateQueries({
        queryKey: studentKeys.detail(variables.id),
      });
    },
  });
}

export function useDeactivateStudentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateStudent(id),
    onSuccess: (_data, id) => {
      invalidateStudentLists(queryClient);
      queryClient.invalidateQueries({ queryKey: studentKeys.detail(id) });
    },
  });
}

export function useDeleteStudentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: (_data, id) => {
      invalidateStudentLists(queryClient);
      queryClient.removeQueries({ queryKey: studentKeys.detail(id) });
    },
  });
}
