import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "investor" | "developer" | "manager";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
}

const MOCK_USERS: Record<UserRole, MockUser> = {
  investor: { id: "inv-1", name: "Carlos Méndez", email: "carlos@investor.com", role: "investor" },
  developer: { id: "dev-1", name: "María López", email: "maria@developer.com", role: "developer", company: "Grupo Inmobiliario Sur" },
  manager: { id: "mgr-1", name: "Ana García", email: "ana@manager.com", role: "manager", company: "Wealth Advisory Co." },
};

interface AuthContextType {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  const login = useCallback((role: UserRole) => {
    setUser(MOCK_USERS[role]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
