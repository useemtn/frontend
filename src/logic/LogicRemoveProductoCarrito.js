import axios from 'axios';

export const removeProductoCarrito = async (productId) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/carritos/remove/${productId}/`, {
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
