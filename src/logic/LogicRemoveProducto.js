import axios from 'axios';

// Función para eliminar un producto obteniendo su ID
export const removeProduct = async (product_id) => {
  try {
    // Llamar a la API para eliminar el producto
    const response = await axios.delete(
      `https://web-production-9f031.up.railway.app/api/productos/remove/${product_id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    // Mostrar un mensaje de éxito
    console.log('Producto eliminado:', response.data);
    // Devolver el estado de la respuesta
    return response.status;
  } catch (error) {
    // Mostrar un mensaje de error
    console.error('Hubo un error al eliminar el producto:', error);
    return error.response.status;
  }
};
