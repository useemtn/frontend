import axios from "axios";

export async function removeFromFavoritos(producto_id) {
    const url = `http://127.0.0.1:8000/api/favoritos/remove/${producto_id}/`;
    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });
        console.log("Producto eliminado de favoritos");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
