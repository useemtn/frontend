import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext/AuthContext';
import { addToFavoritos } from '../logic/LogicAddFavoritos';
import { removeFromFavoritos } from '../logic/LogicRemoveFavorito';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [productosFavoritos, setProductosFavoritos] = useState(() => {
    const storedFavoritos = localStorage.getItem('productosFavoritos');
    return storedFavoritos ? JSON.parse(storedFavoritos) : {};
  });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavoritos = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://127.0.0.1:8000/api/favoritos/get/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
          const favoritos = response.data.reduce((acc, producto) => {
            acc[producto.id_producto.id] = true;
            return acc;
          }, {});
          setProductosFavoritos(favoritos);
        } catch (error) {
          console.error("Hubo un error al obtener los productos favoritos:", error);
        }
      };
      fetchFavoritos();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('productosFavoritos', JSON.stringify(productosFavoritos));
  }, [productosFavoritos]);

  const handleClickFavoritos = async (id) => {
    if (productosFavoritos[id]) {
      await removeFromFavoritos(id);
      setProductosFavoritos((prevProductosFavoritos) => {
        const { [id]: removed, ...rest } = prevProductosFavoritos;
        return rest;
      });
    } else {
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
