import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./components/AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom'; // Import for navigation
const safeDocument = typeof document !== 'undefined' ? document : {};

const Register = () => {
    useEffect(() => {
        document.title = "Register"
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
    return (
        <div className="font-sans body-register">
            <div className="relative min-h-screen min-w-full flex flex-col justify-center items-center">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-purple-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-violet-500 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Crear cuenta
                        </label>
                        <form id="registerForm" className="mt-10">
                            <div>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electronico" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar Contraseña" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            {passwordError && <p className='text-red-500'>{passwordError}</p>} {/* Show the error message if there is one */}
                            <div className="mt-7">
                                <input type="text" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="file" id="imagen" onChange={(e) => setImagen(e.target.files[0])} placeholder="Imagen" className="mt-1 p-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <button type="button" onClick={handleRegister} className="bg-purple-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                    Registrarse
                                </button>
                            </div>
                            <div className="mt-7">
                                <div className="flex justify-center items-center">
                                    <label className="mr-2">¿Ya tienes una cuenta?</label>
                                    <a href="/login	" className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                        Inicia sesión
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
