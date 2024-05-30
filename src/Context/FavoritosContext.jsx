import { createContext, useState, useEffect } from 'react';
import { addToFavoritos } from '../logic/LogicAddFavoritos';
import { removeFromFavoritos } from '../logic/LogicRemoveFavorito';
export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [productosFavoritos, setProductosFavoritos] = useState(() => {
    const storedFavoritos = localStorage.getItem('productosFavoritos');
    return storedFavoritos ? JSON.parse(storedFavoritos) : {};
  });

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