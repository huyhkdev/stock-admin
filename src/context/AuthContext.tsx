import { createContext, useContext, useState, ReactNode } from "react";
import { AuthCredentials } from "../apis/auth.api";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (tokens: AuthCredentials) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const login = (tokens: AuthCredentials) => {
    localStorage.setItem("accessToken", tokens.token);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
