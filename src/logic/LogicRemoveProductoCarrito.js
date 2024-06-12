import axios from 'axios';

export const removeProductoCarrito = async (productId) => {
  try {
    const response = await axios.delete(`https://web-production-2e42.up.railway.app/api/carritos/remove/${productId}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    throw error;
  }
};
