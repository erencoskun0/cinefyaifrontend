"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "user" | "owner" | "admin";
  companyName?: string;
  position?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Demo kullanıcı - gerçek uygulamada localStorage veya API'den gelecek
  const [user, setUser] = useState<User | null>({
    id: "1",
    firstName: "Eren",
    lastName: "Coşkun",
    email: "eren.coskun@cinefyai.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "owner",
    companyName: "CinefyAI Cinemas",
    position: "Sinema Sahibi",
  });

  const isLoggedIn = user !== null;

  const login = (userData: User) => {
    setUser(userData);
    // localStorage'a kaydet
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // localStorage'dan temizle
    localStorage.removeItem("user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: UserContextType = {
    user,
    isLoggedIn,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
