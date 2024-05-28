import axios from 'axios';

export async function removeProduct(product_id) {
    const url = `http://127.0.0.1:8000/api/carritos/remove/${product_id}/`;
    try {
        const response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`, 
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado fuera del rango de 2xx
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('Request error:', error.request);
        } else {
            // Algo pasó al preparar la solicitud
            console.error('Error', error.message);
        }
        throw error;
    }
}