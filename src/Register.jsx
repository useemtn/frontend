import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a new FormData object for multipart/form-data submission
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('descripcion', descripcion);
    formData.append('direccion', direccion);

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
      localStorage.setItem('token', response.data.token); // Store token
      alert('registro exitoso');
      navigate('/index'); // Navigate to index page after successful login
    } catch (error) {
      console.error('Error iniciando sesión:', error.response.data);
      alert('Error registrando usuario');	
    } 
  };
    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Registro
                        </label>
                        <form id="registerForm" className="mt-10">
                            <div>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electronico" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="text" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <input type="file" id="imagen" value={imagen} onChange={(e) => setImagen(e.target.files[0])} placeholder="Imagen" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg focus:ring-0"/>
                            </div>
                            <div className="mt-7">
                                <button type="button" onClick={handleRegister} className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
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
