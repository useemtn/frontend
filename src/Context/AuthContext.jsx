// Importar los componentes necesarios
import { createContext, useState, useEffect} from "react";

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect para comprobar si el token existe
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Si el token existe, se establece el estado de autenticación como verdadero
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  // Función para iniciar sesión
  const login = (token) => {
    localStorage.setItem("token", token);
    // Se establece el estado de autenticación como verdadero
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    // Se elimina el array de favoritos
    localStorage.removeItem("productosFavoritos");
    // Se establece el estado de autenticación como falso
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};