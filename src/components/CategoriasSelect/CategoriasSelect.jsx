import { useState, useEffect } from "react";
import { fetchCategorias } from "../../logic/LogicGetCategorias";

const CategoriaSelect = ({ onCategoriaChange }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async () => {
      const categorias = await fetchCategorias();
      setCategorias(categorias || []); 
    };
    getCategorias();
  }, []);

  return (
    <select
      className="bg-transparent uppercase font-bold text-sm p-4 mr-4"
      onChange={(e) => onCategoriaChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categorias.map((categoria) => (
        <option key={categoria} value={categoria}>
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoriaSelect;
