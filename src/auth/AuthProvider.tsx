import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { AuthContextValue, AuthState, AuthUser } from "./types";

const AUTH_STORAGE_KEY = "healthcare-shell.auth";

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  user: null
};

const readStoredAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return defaultAuthState;
  }

  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return defaultAuthState;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as AuthState;

    if (!parsedValue.isAuthenticated || !parsedValue.user) {
      return defaultAuthState;
    }

    return parsedValue;
  } catch {
    return defaultAuthState;
  }
};

const writeStoredAuthState = (authState: AuthState) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
};

const buildDefaultUser = (partialUser?: Partial<AuthUser>): AuthUser => ({
  id: partialUser?.id ?? "demo-user",
  displayName: partialUser?.displayName ?? "Care Coordinator"
});

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(() => readStoredAuthState());

  const login = (user?: Partial<AuthUser>) => {
    const nextAuthState: AuthState = {
      isAuthenticated: true,
      user: buildDefaultUser(user)
    };

    setAuthState(nextAuthState);
    writeStoredAuthState(nextAuthState);
  };

  const logout = () => {
    setAuthState(defaultAuthState);
    writeStoredAuthState(defaultAuthState);
  };

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      login,
      logout
    }),
    [authState]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return authContext;
};
