import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from './api.service';
interface User {
  id: number;
  username: string;
  avatar?: string;
}
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
        api.get('/profile/stats').then(res => {
          if (res.data && res.data.avatar) {
            setUser(prev => prev ? { ...prev, avatar: res.data.avatar } : null);
          }
        }).catch(() => {});
      } catch {
        setToken(null);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);
  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };
  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};