import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./components/AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom'; // Import for navigation
const safeDocument = typeof document !== 'undefined' ? document : {};

const Register = () => {
    useEffect(() => {
        document.title = "Register";
    }, []);
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(''); // Add this line
    const [direccion, setDireccion] = useState('');
    const [imagen, setImagen] = useState(null);
    const { login } = useContext(AuthContext);
    const html = safeDocument.documentElement;
    html.style.overflow = 'hidden';
    const navigate = useNavigate(); // Hook for navigation
    
    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Create a new FormData object for multipart/form-data submission
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);
        formData.append('direccion', direccion);
        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden'); // Set the error message
            return; // Exit early if passwords don't match
        } else {
            setPasswordError(''); // Clear the error message if passwords match
        }

        // Handle image upload (if applicable)
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            login(response.data.token);
            alert('registro exitoso');
            navigate('/index'); // Navigate to index page after successful login
        } catch (error) {
            console.error('Error iniciando sesión:', error.response.data);
            alert('Error registrando usuario');    
        } 
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    return (
        <div className="bg-gradient-to-b from-[#9F4AFF] to-[#000000] min-h-screen flex items-center justify-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Crear cuenta</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Nombre de usuario" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Correo electrónico" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Contraseña" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" 
                            id="confirm_password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Confirmar Contraseña" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required 
                        />
                    </div>
                    {passwordError && <p className='text-red-500'>{passwordError}</p>} {/* Show the error message if there is one */}
                    <div className="mb-4">
                        <input 
                            type="text" 
                            id="direccion" 
                            value={direccion} 
                            onChange={(e) => setDireccion(e.target.value)} 
                            placeholder="Dirección" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="file" 
                            id="imagen" 
                            onChange={handleImageChange} 
                            placeholder="Imagen" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                        {imagen && (
                            <div className="mt-4">
                                <img src={URL.createObjectURL(imagen)} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-md" />
                            </div>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition ease-in-out duration-150"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-white">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-white font-semibold hover:underline">
                        Iniciar sesión
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;

