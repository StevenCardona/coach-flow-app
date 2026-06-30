"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { registerUser } from "../apis/register";
import { authKeys } from "./keys";

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}
