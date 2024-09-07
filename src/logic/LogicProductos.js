import axios from 'axios';

// Función para añadir un producto al carrito
export async function addToCart(producto_id) {
    // Definir la URL de la API
    const url = `https://web-production-9f031.up.railway.app/api/carrito/add/${producto_id}/`;
    // Llamar a la API para añadir el producto
    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });

      // Mostrar un mensaje de éxito
      console.log("BIEEEEEN");
      // Devolver el carrito
      return response.data;
    } catch (error) {
      // Mostrar un mensaje de error
      console.error(`Error al añadir el producto al carrito: ${error}`);
    }
  }
  