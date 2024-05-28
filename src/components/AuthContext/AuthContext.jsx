import { createContext, useState, useEffect } from 'react';
import Header from '../Header/Header';

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si hay un token en localStorage al cargar la aplicación
        const token = localStorage.getItem('token');
        setisAuthenticated(!!token); // Si hay un token, el usuario está logueado
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setisAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setisAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,setisAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};