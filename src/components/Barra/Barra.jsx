import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (query) => {
        try {
            const response = await axios.get(`https://web-production-2e42.up.railway.app/api/search/?search=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error al buscar productos:', error);
            return [];
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const results = await handleSearch(query);
        navigate('/productos', { state: { results } });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="relative flex items-center">
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