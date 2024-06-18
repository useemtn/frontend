// fetchCategorias.js
import axios from 'axios';

// Función para obtener las categorías
export const fetchCategorias = async () => {
  try {
    // Llamar a la API para obtener las categorías
    const response = await axios.get("https://web-production-2e42.up.railway.app/api/productos/get/categoria/");
    // Devolver las categorías
    return response.data;
  } catch (error) {
    // Mostrar un mensaje de error
    console.error("Hubo un error al obtener las categorías:", error);
  }
};
