import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});

type GetToken = () => Promise<string | null>;

let authInterceptorId: number | null = null;

export function setupAxiosAuth(getToken: GetToken) {
  if (authInterceptorId !== null) {
    api.interceptors.request.eject(authInterceptorId);
  }

  authInterceptorId = api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
  );
}

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
