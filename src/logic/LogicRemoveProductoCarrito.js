import axios from 'axios';

// Función para eliminar un producto del carrito obteniendo su ID
export const removeProductoCarrito = async (productId) => {
  try {
    // Llamar a la API para eliminar el producto
    const response = await axios.delete(`https://web-production-9f031.up.railway.app/api/carritos/remove/${productId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    // Mostrar un mensaje de éxito
    return response.status;
  } catch (error) {
    // Mostrar un mensaje de error
    console.error('Error al eliminar el producto del carrito:', error);
    throw error;
  }
};
