// Importar los componentes necesarios
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { addToFavoritos } from '../logic/LogicAddFavoritos';
import { removeFromFavoritos } from '../logic/LogicRemoveFavorito';

// Crear el contexto
export const FavoritosContext = createContext();

// Crear el proveedor del contexto
export const FavoritosProvider = ({ children }) => {
  // Obtener el estado de autenticación
  const { isAuthenticated } = useContext(AuthContext);
  const [productosFavoritos, setProductosFavoritos] = useState(() => {
    const storedFavoritos = localStorage.getItem('productosFavoritos');
    return storedFavoritos ? JSON.parse(storedFavoritos) : {};
  });

  // Obtener los productos favoritos
  useEffect(() => {
    // Comprobar si el usuario está autenticado
    if (isAuthenticated) {
      const fetchFavoritos = async () => {
        try {
          // Obtener el token del localStorage
          const token = localStorage.getItem("token");
          // Hacer una llamada a la API para obtener los productos favoritos
          const response = await axios.get("https://web-production-9f031.up.railway.app/api/favoritos/get/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
          // Almacenar los productos favoritos en el estado
          const favoritos = response.data.reduce((acc, producto) => {
            acc[producto.id_producto.id] = true;
            return acc;
          }, {});
          setProductosFavoritos(favoritos);
        } catch (error) {
          console.error("Hubo un error al obtener los productos favoritos:", error);
        }
      };

      // Llamar a la función para obtener los favoritos
      fetchFavoritos();
    }
  }, [isAuthenticated]); // Actualizar solo cuando el usuario este autenticado

  useEffect(() => {
    // Almacenar los productos favoritos en el localStorage
    localStorage.setItem('productosFavoritos', JSON.stringify(productosFavoritos));
  }, [productosFavoritos]); // Actualizar solo cuando los productos favoritos cambien

  const handleClickFavoritos = async (id) => {
    // Comprobar si el producto ya esta en favoritos
    if (productosFavoritos[id]) {
      await removeFromFavoritos(id);
      setProductosFavoritos((prevProductosFavoritos) => {
        // Eliminar el producto de favoritos
        const { [id]: removed, ...rest } = prevProductosFavoritos;
        return rest;
      });
    } else {
      // Agregar el producto a favoritos
      await addToFavoritos(id);
      setProductosFavoritos((prevProductosFavoritos) => ({
        ...prevProductosFavoritos,
        [id]: true,
      }));
    }
  };

  return (
    <FavoritosContext.Provider value={{ productosFavoritos, handleClickFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
};