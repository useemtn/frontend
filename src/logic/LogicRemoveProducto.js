import axios from 'axios';

export const removeProduct = async (product_id) => {
  try {
    const response = await axios.delete(
      `https://web-production-2e42.up.railway.app/api/productos/remove/${product_id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log('Producto eliminado:', response.data);
    return response.status;
  } catch (error) {
    console.error('Hubo un error al eliminar el producto:', error);
    return error.response.status;
  }
};
