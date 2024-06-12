import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./components/AuthContext/AuthContext";
import toast, { Toaster } from "react-hot-toast";
const safeDocument = typeof document !== "undefined" ? document : {};

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const html = safeDocument.documentElement;
  html.style.overflow = "hidden";

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      login(response.data.token);
      window.location.href = "/index"; // Navigate to index page after successful login
    } catch (error) {
      console.error("Error iniciando sesión:", error.response?.data || error.message);
      if (error.response && error.response.data) {
        if (error.response.data.non_field_errors) {
          toast.error("Credenciales inválidas. Por favor, inténtalo de nuevo.");
        } else {
          toast.error("Error iniciando sesión. Por favor, verifica tus datos.");
        }
      } else {
        toast.error("Error iniciando sesión. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#000000] to-[#9F4AFF] min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition ease-in-out duration-150"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="font-semibold text-white hover:underline"
          >
            Regístrate
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

export default Login;
