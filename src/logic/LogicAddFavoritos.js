// importar la libreria axios
import axios from "axios";

export async function addToFavoritos(product_id) {
    // Definir la URL de la API
    const url = `https://web-production-2e42.up.railway.app/api/favoritos/add/${product_id}/`;
    try {
        // Llamar a la API para añadir el producto
        const response = await axios.post(url, {}, {
            headers: {
                // Definir el tipo de contenido
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });

        // Mostrar un mensaje de éxito
        console.log("Producto añadido a favoritos");
        return response.data;
    } catch (error) {
        // Mostrar un mensaje de error
        console.error(error);
    }
}