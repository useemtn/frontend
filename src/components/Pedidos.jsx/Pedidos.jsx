import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../components/AuthContext/AuthContext';
import axios from 'axios';
import ProductosDialog from '../ProductosDialog/ProductosDialoag';
import 'tailwindcss/tailwind.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    document.title = "Mis pedidos";
    if (isAuthenticated) {
      axios
        .get('http://127.0.0.1:8000/api/pedidos/get/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          console.log(response.data); // Verifica la estructura de los datos aquí
          setPedidos(response.data);
        })
        .catch((error) => {
          console.error('Hubo un error al obtener los pedidos:', error);
        });
    }
  }, [isAuthenticated]);

  const openDialog = (pedido) => {
    setSelectedPedido(pedido);
  };

  const closeDialog = () => {
    setSelectedPedido(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
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
        <p>No tienes pedidos.</p>
      )}

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
