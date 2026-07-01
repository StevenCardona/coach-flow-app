"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  clearAccessToken,
  hasAccessToken,
  setAccessToken,
} from "@/lib/auth/token-storage";

interface AuthContextValue {
  isAuthenticated: boolean;
  setSessionToken: (token: string) => void;
  logout: () => void;
  refreshAuthState: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialIsAuthenticated?: boolean;
}

export function AuthProvider({
  children,
  initialIsAuthenticated = false,
}: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);

  useEffect(() => {
    setIsAuthenticated(hasAccessToken());
  }, []);

  const refreshAuthState = useCallback(() => {
    setIsAuthenticated(hasAccessToken());
  }, []);

  const setSessionToken = useCallback((token: string) => {
    setAccessToken(token);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearAccessToken();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      setSessionToken,
      logout,
      refreshAuthState,
    }),
    [isAuthenticated, setSessionToken, logout, refreshAuthState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}
