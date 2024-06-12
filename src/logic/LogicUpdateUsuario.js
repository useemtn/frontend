import axios from 'axios';

export const updateUser = async (updateData) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': updateData instanceof FormData ? 'multipart/form-data' : 'application/json',
        Authorization: `Token ${token}`,
      },
    };

    const response = await axios.patch(
      `https://web-production-2e42.up.railway.app/api/usuarios/update/`,
      updateData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Hubo un error al actualizar el usuario:', error);
    throw error;
  }
};
