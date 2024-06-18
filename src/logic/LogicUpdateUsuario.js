import axios from 'axios';

// Función para actualizar un usuario
export const updateUser = async (updateData) => {
  try {
    // Llamar a la API para actualizar el usuario obteniendo su token de autenticación
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': updateData instanceof FormData ? 'multipart/form-data' : 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    // Llamar a la API para actualizar el usuario
    const response = await axios.patch(
      `https://web-production-2e42.up.railway.app/api/usuarios/update/`,
      updateData,
      config
    );

    // Devolver los datos de la respuesta
    return response.data;
  } catch (error) {
    // Mostrar un mensaje de error
    console.error('Hubo un error al actualizar el usuario:', error);
    throw error;
  }
};
