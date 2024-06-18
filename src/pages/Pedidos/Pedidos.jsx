// Importar los componentes necesarios
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import ProductosDialog from '../../components/ProductosDialog/ProductosDialoag';
import 'tailwindcss/tailwind.css';

// Función para obtener los pedidos
const Pedidos = () => {
  // Variables de estado
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación

  // Funciones de estado
  useEffect(() => {
    document.title = "Mis pedidos";
    // Comprobar si el usuario está autenticado
    if (isAuthenticated) {
      axios
        .get('https://web-production-2e42.up.railway.app/api/pedidos/get/', { // Obtener los pedidos si el usuario esta autenticado
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          console.log(response.data); // Imprimir los datos de la respuesta
          setPedidos(response.data);
        })
        .catch((error) => {
          // Mostrar un mensaje de error si hay un error al obtener los pedidos
          console.error('Hubo un error al obtener los pedidos:', error);
        });
    }
  }, [isAuthenticated]); // Actualizar cada vez que cambie el estado de autenticación

  // Función para abrir el diálogo de pedido
  const openDialog = (pedido) => {
    // Abrir el diálogo de pedido
    setSelectedPedido(pedido);
  };

  // Función para cerrar el diálogo de pedido
  const closeDialog = () => {
    // Cerrar el diálogo de pedido
    setSelectedPedido(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
      {/* Mostrar los pedidos si es mayor que 0 */}
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="border-b py-4 mb-4">
            <div className="flex justify-between">
              <div>
                <p><strong>ID:</strong> {pedido.id}</p>
                <p><strong>Estado:</strong> {pedido.estado}</p>
                <p><strong>Fecha:</strong> {pedido.fecha_pedido}</p>
                <p><strong>Total:</strong> {pedido.productos.reduce((acc, producto) => acc + parseFloat(producto.id_producto.precio), 0)} €</p>
              </div>
              <button
                onClick={() => openDialog(pedido)}
                className="bg-purple-500 h-16 text-white py-2 px-4 rounded hover:bg-purple-700 hover:scale-105 transition"
              >
                Ver productos
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>
          {/* Mostrar un mensaje si no hay pedidos */}
          No tienes pedidos.
        </p>
      )}

      {/* Mostrar el diálogo de pedido si hay uno seleccionado */}
      {selectedPedido && (
        <ProductosDialog 
          pedido={selectedPedido}
          isOpen={selectedPedido !== null}
          onClose={closeDialog}
        />
      )}
    </div>
  );
};

export default Pedidos;
