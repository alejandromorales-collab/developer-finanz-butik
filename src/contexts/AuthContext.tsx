import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "investor" | "developer" | "vendor" | "agent";

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
  vendor: { id: "ven-1", name: "Alejandro Ruiz", email: "alejandro@legalfirm.com", role: "vendor", company: "Ruiz & Asociados Legal" },
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
