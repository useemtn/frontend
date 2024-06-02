import axios from 'axios';

const getUserIdFromToken = async (token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`, 
            },
        };

        const res = await axios.get('http://127.0.0.1:8000/api/usuarios/', config);
        return res.data.id;
    } catch (err) {
        console.error(err);
        throw new Error('Error obteniendo el ID del usuario');
    }
};

export const SubirProducto = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No se encontró token de usuario');
        }

        const userId = await getUserIdFromToken(token);

        formData.append('id_usuario', userId); // Añadir el ID del usuario al formulario

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${localStorage.getItem('token')}`, // Agregar el token de usuario en la cabecera de la petición HTTP como una cadena de texto, por ejemplo: `Token ${token}`,
            },
        };

        const res = await axios.post('http://127.0.0.1:8000/api/add/', formData, config);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
