import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Vender = () => {
    useEffect(() => {
        document.title = "Subir Producto";
    }, []);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [talla, setTalla] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);
    const [moreImages, setMoreImages] = useState([]);
    const [showMoreImages, setShowMoreImages] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (showMoreImages && moreImages.length > 4) {
            toast.error("No puedes añadir más de 4 imágenes adicionales. El producto se subirá solo con una imagen.");
            setShowMoreImages(false);
            setMoreImages([]); // Clear additional images
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('talla', talla);
        formData.append('categoria', categoria);
        formData.append('precio', precio);
        if (imagen) {
            formData.append('imagen', imagen);
        }
        if (showMoreImages) {
            moreImages.forEach((img, index) => {
                formData.append(`imagen${index + 2}`, img);
            });
        }
        try {
            const response = await axios.post('https://web-production-2e42.up.railway.app/api/productos/add/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            });
            console.log(response.data);
            toast.success('Producto subido con éxito!'); // Notificación de éxito
            navigate('/index');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error registrando producto:', error.response.data);
                toast.error('Error al subir el producto.');
            } else {
                console.error('Error registrando producto:', error.message);
                toast.error('Error al subir el producto.');
            }
        }
    };

    const handleMoreImages = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (moreImages.length + selectedFiles.length > 4) {
            toast.error("No puedes añadir más de 4 imágenes adicionales. El producto se subirá solo con una imagen.");
            setShowMoreImages(false);
            setMoreImages([]); // Clear additional images
        } else {
            setMoreImages([...moreImages, ...selectedFiles.slice(0, 4 - moreImages.length)]);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = moreImages.filter((_, i) => i !== index);
        setMoreImages(newImages);
    };

    return (
        <div className="font-sans body-register">
            <div className="relative m-auto min-h-full flex flex-col justify-center items-center">
                <div className="relative sm:max-w-xl w-full px-4 md:px-0 mb-20">
                    <div className="card bg-purple-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-violet-500 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl px-6 py-8 bg-gray-100 shadow-md">
                        <label className="block mb-6 text-sm text-gray-700 text-center font-semibold">
                            Subir producto
                        </label>
                        <form id="registerForm" className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleRegister}>
                            <div className="col-span-1">
                                <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del producto" className="mt-1 p-2 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required/>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción del producto" className="mt-1 p-2 w-full border-none bg-gray-100 h-24 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required></textarea>
                            </div>
                            <div className="col-span-1">
                                <input type="text" id="talla" value={talla} onChange={(e) => setTalla(e.target.value)} placeholder="Talla del producto" className="mt-1 p-2 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required/>
                            </div>
                            <div className="col-span-1">
                                <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoría" className="mt-1 p-2 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required>
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
                            <div className="col-span-1">
                                <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" className="mt-1 p-2 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" required/>
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <input type="file" id="imagen" onChange={(e) => setImagen(e.target.files[0])} placeholder="Imagen" className="mt-1 p-2 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg focus:ring-0" required/>
                                {imagen && (
                                    <div className="mt-4">
                                        <img src={URL.createObjectURL(imagen)} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-md" />
                                    </div>
                                )}
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm text-gray-700 font-semibold">¿Quieres añadir más imágenes?</label>
                                <div className="flex items-center mt-2">
                                    <input type="checkbox" id="addMoreImages" checked={showMoreImages} onChange={() => setShowMoreImages(!showMoreImages)} className="mr-2" />
                                    <label htmlFor="addMoreImages" className="text-sm text-gray-700">Sí</label>
                                </div>
                            </div>
                            {showMoreImages && (
                                <div className="col-span-1 md:col-span-2">
                                    <input type="file" onChange={handleMoreImages} multiple accept="image/*" className="mt-1 p-2 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg focus:ring-0" />
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {moreImages.length > 0 && moreImages.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
                                                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="col-span-1 md:col-span-2">
                                <button type="submit" className="bg-purple-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                    Subir Producto
                                </button>
                            </div>
                        </form>
                        <Toaster />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vender;
