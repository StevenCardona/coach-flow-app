"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

import { setupAxiosAuth } from "@/lib/http/axios";

export function useAxiosAuth() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    setupAxiosAuth(async () => {
      if (!isSignedIn) return null;
      return getToken();
    });
  }, [getToken, isLoaded, isSignedIn]);
}
