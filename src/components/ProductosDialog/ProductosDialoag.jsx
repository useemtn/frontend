import React from 'react';
import 'tailwindcss/tailwind.css';

const ProductosDialog = ({ pedido, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
        <div className="px-4 py-2 bg-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium">Productos del Pedido {pedido.id}</h3>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="px-4 py-4 max-h-80 overflow-y-auto">
          {pedido.productos.map((producto) => (
            <div key={producto.id} className="mb-4">
              <img
                src={`http://127.0.0.1:8000${producto.id_producto.imagen}`}
                alt={producto.id_producto.nombre}
                className="w-full h-48 object-cover mb-2"
              />
              <p><strong>Nombre:</strong> {producto.id_producto.nombre}</p>
              <p><strong>Descripción:</strong> {producto.id_producto.descripcion}</p>
              <p><strong>Talla:</strong> {producto.id_producto.talla}</p>
              <p><strong>Precio:</strong> {producto.id_producto.precio} €</p>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 bg-gray-200 flex justify-end">
          <button
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductosDialog;
