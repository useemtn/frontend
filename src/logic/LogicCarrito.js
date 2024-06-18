import axios from "axios";

// Función para obtener el carrito
export async function getCarrito() {
    // Definir la URL de la API
    const url = "https://web-production-2e42.up.railway.app/api/carritos/get/";
    try {
        // Llamar a la API para obtener el carrito
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });
        // Mostrar un mensaje de éxito
        console.log(response.data);

        // Devolver el carrito
        return response.data;
    } catch (error) {
        // Mostrar un mensaje de error
        console.error(error);
    }
}