import axios from 'axios';

// Función para actualizar un producto obteniendo su ID
export const updateProduct = async (product_id, updateData) => {
  try {
    // Llamar a la API para actualizar el producto
    const response = await axios.patch(
      `https://web-production-2e42.up.railway.app/api/productos/update/${product_id}/`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );

    // Devolver los datos de la respuesta
    return response.data;
  } catch (error) {
    // Mostrar un mensaje de error
    console.error('Hubo un error al actualizar el producto:', error);
    throw error;
  }
};
