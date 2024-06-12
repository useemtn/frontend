import axios from 'axios';


export async function addToCart(producto_id) {
    const url = `https://web-production-2e42.up.railway.app/api/carrito/add/${producto_id}/`;
  
    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      console.log("BIEEEEEN");
      return response.data;
    } catch (error) {
      console.error(`Error al añadir el producto al carrito: ${error}`);
    }
  }
  