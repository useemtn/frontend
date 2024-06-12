// fetchCategorias.js
import axios from 'axios';

export const fetchCategorias = async () => {
  try {
    const response = await axios.get("https://web-production-2e42.up.railway.app/api/productos/get/categoria/");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al obtener las categorías:", error);
  }
};
