"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authApi, type AuthResult, type User } from "@/api/auth.api";
type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (v: { email: string; password: string }) => Promise<void>;
  register: (v: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(
    () =>
      typeof window !== "undefined" &&
      !localStorage.getItem("graphsphere_token"),
  );
  const queryClient = useQueryClient();
  const apply = (result: AuthResult) => {
    localStorage.setItem("graphsphere_token", result.accessToken);
    setUser(result.user);
  };
  const logout = () => {
    localStorage.removeItem("graphsphere_token");
    queryClient.clear();
    setUser(null);
  };
  useEffect(() => {
    if (!localStorage.getItem("graphsphere_token")) return;
    authApi
      .me()
      .then((result) => setUser(result.user))
      .catch(logout)
      .finally(() => setReady(true));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handler = () => logout();
    window.addEventListener("graphsphere:unauthorized", handler);
    return () =>
      window.removeEventListener("graphsphere:unauthorized", handler);
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        login: async (v) => apply(await authApi.login(v)),
        register: async (v) => apply(await authApi.register(v)),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
