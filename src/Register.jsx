// Importar los componentes necesarios
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./Context/AuthContext"; // Importar el contexto de autenticación
import { useNavigate } from 'react-router-dom'; 
import toast, { Toaster } from 'react-hot-toast'; // Importar la librería de notificación
const safeDocument = typeof document !== 'undefined' ? document : {};

const Register = () => {
    useEffect(() => {
        document.title = "Register";
    }, []);
    
    // Definir los estados correspondientes
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [direccion, setDireccion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext); // Obtiene el estado de autenticación
    const html = safeDocument.documentElement;
    html.style.overflow = 'hidden';
    const navigate = useNavigate();

    const username_validate = (username) => {
        const usernameRegex = /^\S+$/; // No espacios
        return usernameRegex.test(username);
    };

    // Función para validar la contraseña
    const password_validate = (password) => {
        // Al menos una mayúscula, una minúscula, un número y un caracter especial
        var re = {
            capital: /(?=.*[A-Z])/,
            length: /(?=.{8,})/,
            specialChar: /(?=.*[@$!%.*?-_&])/,
            digit: /(?=.*[0-9])/,
        };
        // Validar la contraseña
        return (
            re.capital.test(password) &&
            re.length.test(password) &&
            re.specialChar.test(password) &&
            re.digit.test(password)
        );
    };

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        if (!username_validate(username)) {
            // Si el nombre de usuario no es valido mostrar un mensaje de error
            toast.error('El nombre de usuario no debe contener espacios.');
            return;
        }

        // Crear un objeto FormData con los datos del formulario
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirm_password', confirmPassword);
        formData.append('direccion', direccion);

        // Comprobar si las contraseñas coinciden
        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden'); // Mostrar un mensaje de error
            return; // Salir de la función
        } else if (!password_validate(password)) { // Validar la contraseña
            setPasswordError('La contraseña debe tener mínimo 8 caracteres, 1 letra mayúscula, 1 signo y 1 número');
            return;
        } else {
            setPasswordError(''); // Limpiar el mensaje de error si hay uno
        }

        // Manejar la imagen si hay una
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            // Llamar a la API para registrar el usuario
            const response = await axios.post('https://web-production-9f031.up.railway.app/api/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Mostrar un mensaje de éxito
            console.log(response.data);
            login(response.data.token);

            // Redirigir a la página de inicio
            toast.success('Registro exitoso');
            window.location.href = '/index'; // NRedirecionar a la página de inicio
        } catch (error) {
            // Mostrar un mensaje de error para las siguientes situaciones
            console.error('Error registrando usuario:', error.response ? error.response.data : error.message);
            if (error.response) {
                if (error.response.data.username) {
                    // Si el nombre de usuario ya existe mostrar un mensaje de error
                    toast.error('El nombre de usuario ya está en uso.');
                } else if (error.response.data.email) {
                    // Si el correo electrónico ya existe mostrar un mensaje de error
                    toast.error('El correo electrónico ya está en uso.');
                } else {
                    // Si hay otro tipo de error mostrar un mensaje de error
                    toast.error('Error registrando usuario: ' + error.response.data.detail);
                }
            } else {
                toast.error('Error registrando usuario: ' + error.message);
            }
        }
    };

    // Manejar el cambio de imagen
    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    // Manejar el ver u ocultar de contraseña
    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Cambia el estado de 'showPassword'
    };

    return (
        <div className="bg-gradient-to-b from-[#9F4AFF] to-[#000000] min-h-screen flex items-center justify-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Crear cuenta</h2>
                {/* Manejar el envío del formulario */}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        {/* Establecer el nombre de usuario */}
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
                        {/* Establecer el correo electrónico */}
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
                        {/* Establecer la contraseña */}
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Contraseña" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        {/* Establecer la confirmación de la contraseña */}
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="confirm_password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Confirmar Contraseña" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required 
                        />
                    </div>
                    {passwordError && <p className='text-red-500'>{passwordError}</p>} {/* Mostrar el error de la contraseña */}
                    <div className="flex items-center mb-4">
                        {/* Establecer el ver u ocultar de la contraseña */}
                        <input 
                            type="checkbox" 
                            id="show_password" 
                            checked={showPassword} 
                            onChange={toggleShowPassword} 
                            className="mr-2"
                        />
                        <label htmlFor="show_password" className="text-white">Mostrar Contraseña</label>
                    </div>
                    <div className="mb-4">
                        {/* Establecer la dirección */}
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
                        {/* Manejar la imagen */}
                        <input 
                            type="file" 
                            id="imagen" 
                            onChange={handleImageChange} 
                            placeholder="Imagen" 
                            className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            required
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
                <p className="mt-6 text-center text-sm text-white">
                    <a href="/" className="text-white font-semibold hover:underline">
                        Volver al inicio
                    </a>
                </p>
            </div>
            <Toaster />
        </div>
    );
};

export default Register;
