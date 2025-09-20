
import React, { createContext, useContext, useState } from "react";
import { setTokens, clearTokens, isAuthenticated } from "./tokenService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(isAuthenticated());

  const login = (tokens) => {
    setTokens(tokens);
    setAuth(true);
  };

  const logout = () => {
    clearTokens();
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
