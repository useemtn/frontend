// Importar los componentes necesarios
import { useState, useEffect } from "react";
import { fetchCategorias } from "../../logic/LogicGetCategorias";

// Definir el componente
const CategoriaSelect = ({ onCategoriaChange }) => {
  // Definir el estado de categorías
  const [categorias, setCategorias] = useState([]);
  // Obtener las categorías
  useEffect(() => {
    const getCategorias = async () => {
      // Llamar a la función para obtener las categorías (importadas)
      const categorias = await fetchCategorias();
      // Actualizar el estado de categorías
      setCategorias(categorias || []); 
    };
    // Llamar a la función para obtener las categorías
    getCategorias();
  }, []);

  return (
    <select
      className="bg-transparent uppercase font-bold text-sm p-4 mr-4"
      onChange={(e) => onCategoriaChange(e.target.value)}
      >
      {/* Actualizar el estado de categoría al cambiar el valor del select */}
      <option value="">All Categories</option>
      {/* Mostrar las categorías en el select */}
      {categorias.map((categoria) => (
        <option key={categoria} value={categoria}>
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoriaSelect;
