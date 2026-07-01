import axios, { type InternalAxiosRequestConfig } from "axios";

import { clearAccessToken, getAccessToken } from "@/lib/auth/token-storage";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const isAuthPage =
        pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

      if (!isAuthPage) {
        clearAccessToken();
        const redirectUrl = encodeURIComponent(pathname);
        window.location.href = `/sign-in?redirect_url=${redirectUrl}`;
      }
    }

    return Promise.reject(error);
  },
);
