// src/context/AuthContext.tsx
"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import authService from "../api/authSevice";
import { User } from "../types/auth";
import { saveToken, getToken, clearToken } from "../utils/storage";
import { AuthResponse } from "../types/auth";
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

const loadUser = async () => {
  try {
    const response = await authService.getProfile();
    const user = response.data.data.user; // correct
    setUser(user);
  } catch {
    logout();
  }
  setLoading(false);
};



const login = async (email: string, password: string) => {
  const response = await authService.login({
    email,
    password,
    userType: "user"
  });

  const apiData = response.data.data;

  // TYPESCRIPT CASTING (Optional)
  const tokens = response.data.data.tokens;

  saveToken(tokens.accessToken);

  await loadUser();
};


  const logout = () => {
    clearToken();
    setUser(null);
  };

  useEffect(() => {
    if (getToken()) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
