import axios from 'axios';

export const updateProduct = async (product_id, updateData) => {
  try {
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
    return response.data;
  } catch (error) {
    console.error('Hubo un error al actualizar el producto:', error);
    throw error;
  }
};
