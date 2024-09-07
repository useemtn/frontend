import axios from 'axios';

// Función para eliminar un usuario
export const removeUser = async () => {
  try {
    // Llamar a la API para eliminar el usuario
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    // Llamar a la API para eliminar el usuario
    const response = await axios.delete(
      `https://web-production-9f031.up.railway.app/api/usuarios/remove/`,
      config
    );
    // Si la petición fue exitosa
    if (response.status === 204) {
      // Usuario eliminado correctamente
      return true;
    }
  } catch (error) {
    // Mostrar un mensaje de error
    console.error('Hubo un error al eliminar el usuario:', error);
    return false;
  }
};
