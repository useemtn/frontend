import axios from "axios";

export async function addToFavoritos(product_id) {
    const url = `https://web-production-2e42.up.railway.app/api/favoritos/add/${product_id}/`;
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