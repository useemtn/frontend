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
      `http://127.0.0.1:8000/api/usuarios/update/`,
      updateData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Hubo un error al actualizar el usuario:', error);
    throw error;
  }
};
