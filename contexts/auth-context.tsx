"use client";

import React from "react";

export type User = {
  id: string;
  name: string;
  username: string;
};

type AuthContextValue = {
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const signIn = React.useCallback(async (username: string, password: string) => {
    // Demo only: accept any non-empty creds
    await new Promise((r) => setTimeout(r, 300));
    if (!username || !password) throw new Error("아이디와 비밀번호를 입력하세요.");
    setUser({ id: "1", name: username, username });
  }, []);

  const signOut = React.useCallback(async () => {
    await new Promise((r) => setTimeout(r, 200));
    setUser(null);
  }, []);

  const value = React.useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


