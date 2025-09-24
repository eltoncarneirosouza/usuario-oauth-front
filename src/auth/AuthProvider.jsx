
import React, { createContext, useContext, useState, useEffect } from "react";
import { setTokens, clearTokens, isAuthenticated } from "./tokenService";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(isAuthenticated());
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica a autenticação em cada mudança de rota
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      setAuth(isAuth);

      // Se não estiver autenticado e não estiver na página de login, redireciona
      if (!isAuth && location.pathname !== "/login") {
        navigate("/login");
      }
    };

    checkAuth();
  }, [location, navigate]);

  const login = (tokens) => {
    setTokens(tokens);
    setAuth(true);
  };

  const logout = () => {
    clearTokens();
    setAuth(false);
    navigate("/login");
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
