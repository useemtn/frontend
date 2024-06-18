// Importar los componentes necesarios
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Definir el componente
const SearchBar = () => {
    // Definir el estado de búsqueda
    const [query, setQuery] = useState('');

    // Definir la función de búsqueda
    const navigate = useNavigate();
    // Definir la función de búsqueda
    const handleSearch = async (query) => {
        try {
            // Llamar a la función para obtener los datos
            const response = await axios.get(`https://web-production-2e42.up.railway.app/api/search/?search=${query}`);

            // Devolver los datos
            return response.data;
        } catch (error) {
            // Manejar el error
            console.error('Error al buscar productos:', error);
            return [];
        }
    };

    // Definir la función de envío
    const onSubmit = async (e) => {
        e.preventDefault();

        // Llamar a la función de búsqueda
        const results = await handleSearch(query);

        // Redirigir a la página de productos
        navigate('/productos', { state: { results } });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="relative flex items-center">
                    {/* Icono de búsqueda y función de búsqueda*/}
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Buscar..." 
                        className="px-2 py-1 rounded-md w-32 sm:px-4 sm:py-2 sm:w-80 lg:w-96 pr-10" 
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 text-black"
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;