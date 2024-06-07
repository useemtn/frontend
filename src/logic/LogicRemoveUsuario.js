import axios from 'axios';

export const removeUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/usuarios/remove/`,
      config
    );
    if (response.status === 204) {
      // Usuario eliminado correctamente
      return true;
    }
  } catch (error) {
    console.error('Hubo un error al eliminar el usuario:', error);
    return false;
  }
};
