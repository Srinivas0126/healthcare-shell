export type AuthUser = {
  displayName: string;
  id: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
};

export type AuthContextValue = AuthState & {
  login: (user?: Partial<AuthUser>) => void;
  logout: () => void;
};
