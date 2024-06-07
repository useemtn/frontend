import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const comprobarToken = useCallback(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    comprobarToken();
    window.addEventListener("storage", comprobarToken);
    return () => window.removeEventListener("storage", comprobarToken);  
  }, [comprobarToken]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("productosFavoritos");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
