import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Vender = () => {
    useEffect(() => {
        document.title = "Vender";
    }, []);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [talla, setTalla] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('talla', talla);
        formData.append('categoria', categoria);
        formData.append('precio', precio);
        if (imagen) {
            formData.append('imagen', imagen);
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/productos/add/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            });
            console.log(response.data);
            navigate('/index');
        } catch (error) {
            console.error('Error registrando producto:', error.response.data);
        }
    };

    return (
        <div className="font-sans body-register">
            <div className="relative min-h-screen min-w-full flex flex-col justify-center items-center">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-purple-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-violet-500 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                        <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Subir producto
                        </label>
                        <form id="registerForm" className="mt-10" onSubmit={handleRegister}>
                            <div>
                                <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción del producto" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="text" id="talla" value={talla} onChange={(e) => setTalla(e.target.value)} placeholder="Talla del producto" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <select type="text" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoría" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                    <option value="">Categoría</option>
                                    <option value="pantalon">Pantalones</option>
                                    <option value="camiseta">Camiseta</option>
                                    <option value="sudadera">Sudadera</option>
                                    <option value="chaqueta">Chaqueta</option>
                                    <option value="cazadora">Cazadora</option>
                                    <option value="zapato">Zapatos</option>
                                    <option value="zapatilla">Zapatillas</option>
                                    <option value="accesorio">Accesorio</option>
                                    <option value="bermuda">Bermuda</option>
                                </select>
                            </div>
                            <div className="mt-7">
                                <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="file" id="imagen" onChange={(e) => setImagen(e.target.files[0])} placeholder="Imagen" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <button type="submit" className="bg-purple-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                    Subir Producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vender;
