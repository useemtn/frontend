import axios from "axios";

export async function addToFavoritos(product_id) {
    const url = `http://127.0.0.1:8000/api/favoritos/add/${product_id}/`;
    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });
        console.log("Producto añadido a favoritos");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}