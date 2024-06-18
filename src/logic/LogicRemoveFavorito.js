import axios from "axios";

// Función para eliminar un producto de favoritos
export async function removeFromFavoritos(producto_id) {
    // Definir la URL de la API
    const url = `https://web-production-2e42.up.railway.app/api/favoritos/remove/${producto_id}/`;
    try {
        // Llamar a la API para eliminar el producto
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });
        // Mostrar un mensaje de éxito
        console.log("Producto eliminado de favoritos");
        // Devolver el carrito
        return response.data;
    } catch (error) {
        // Mostrar un mensaje de error
        console.error(error);
    }
}
