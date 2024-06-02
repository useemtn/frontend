// fetchCategorias.js
import axios from 'axios';

export const fetchCategorias = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/categorias/");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al obtener las categorías:", error);
  }
};
