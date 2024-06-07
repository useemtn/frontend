import { useState } from 'react';
import { updateProduct } from '../../logic/LogicUpdateProducto';

const EditProduct = ({ product, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: product.nombre,
    descripcion: product.descripcion,
    talla: product.talla,
    categoria: product.categoria,
    precio: product.precio,
    // Imagen será manejada aparte
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(product.id, formData);
      console.log('Producto actualizado:', updatedProduct);
      onUpdate(updatedProduct);
    } catch (error) {
      console.error('Hubo un error al actualizar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Talla:</label>
        <input
          type="text"
          name="talla"
          value={formData.talla}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría:</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="pantalon">Pantalón</option>
          <option value="camiseta">Camiseta</option>
          <option value="sudadera">Sudadera</option>
          <option value="chaqueta">Chaqueta</option>
          <option value="cazadora">Cazadora</option>
          <option value="zapato">Zapato</option>
          <option value="zapatilla">Zapatilla</option>
          <option value="accesorio">Accesorio</option>
          <option value="bermuda">Bermuda</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Precio:</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
        >
          Actualizar Producto
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
