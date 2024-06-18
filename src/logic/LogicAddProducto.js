import axios from 'axios';
// crear un objeto FormData para enviar los datos del formulario
const getUserIdFromToken = async (token) => {
    try {
        // Obtener el ID del usuario a partir del token
        const config = {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`, 
            },
        };
        // Realizar peticióm get HTTP para obtener el ID del usuario
        const res = await axios.get('https://web-production-2e42.up.railway.app/api/usuarios/', config);

        // Devolver el ID del usuario
        return res.data.id;
    } catch (err) {
        console.error(err);
        // Manejar el error
        throw new Error('Error obteniendo el ID del usuario');
    }
};
// Función para subir un producto
export const SubirProducto = async () => {
    try {
        // crear un objeto FormData para enviar los datos del formulario
        const token = localStorage.getItem('token');
        // Sino existe token, se lanza un error
        if (!token) {
            // Manejar el error
            throw new Error('No se encontró token de usuario');
        }
        // Obtener el ID del usuario a partir del token
        const userId = await getUserIdFromToken(token);
        // Crear un objeto FormData para enviar los datos del formulario
        formData.append('id_usuario', userId); // Añadir el ID del usuario al formulario

        const config = {
            // Definir el tipo de contenido
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${localStorage.getItem('token')}`, // Agregar el token de usuario en la cabecera de la petición HTTP como una cadena de texto, por ejemplo: `Token ${token}`,
            },
        };
        // Realizar la petición HTTP para subir el proyecto
        const res = await axios.post('https://web-production-2e42.up.railway.app/api/add/', formData, config);
        // Devolver el ID del producto subido
        return res.data;
    } catch (err) {
        // Manejar el error
        console.error(err);
        throw err;
    }
};
