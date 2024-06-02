import axios from "axios";
import { useEffect, useState } from "react";
import "../../css/Profile.css";
import "../../css/Productos.css";
const Profile = () => {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/productos/get/usuario/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Productos:", response.data);
        setProductos(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener los productos:", error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/usuarios/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Usuarios:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUsuarios(response.data[0]); // Suponiendo que necesitas el primer usuario
        } else {
          setUsuarios(response.data);
        }
      } catch (error) {
        console.error("Hubo un error al obtener los usuarios:", error);
      }
    };

    fetchProductos();
    fetchUsuarios();
  }, []);

  return (
    <>
      <div className="contenedor-perfil w-full h-96 flex flex-col items-center mt-5 mb-3">
        <div className="contenedor-perfil-img w-64 h-64 rounded-full border-2 border-black">
          {usuarios.imagen ? (
            <img
              src={`${usuarios.imagen}`}
              alt="Imagen de perfil"
              className="w-full h-full rounded-full border-2 border-black"
            />
          ) : (
            <p>Imagen no disponible</p>
          )}
        </div>

        <div className="contenedor-perfil-info">
          <h1>{usuarios.username}</h1>
          <p>{usuarios.email}</p>
          <p>{usuarios.direccion}</p>
          <p>{usuarios.fecha_creacion}</p>
        </div>
      </div>
      <div className="contenedor-productos">
        {productos.length > 0
          ? productos.map((producto) => (
              <div
                key={producto.id}
                className="contenedor-producto relative bg-white transition p-1 mb-4"
              >
                <div className="contenedor-imagen flex justify-center items-center p-1">
                  <img
                    src={`http://127.0.0.1:8000${producto.id_usuario.imagen}`}
                    alt="Imagen de perfil"
                    className="object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />
                </div>
                <div
                  className="relative border border-gray-100 bg-white p-6"
                  style={{ width: "100%", height: "40%" }}
                >
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {producto.nombre}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-700">
                    Talla: {producto.talla}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-700">
                    {producto.descripcion}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-700">
                    Precio: ${producto.precio}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-700">
                    Subido por: {producto.id_usuario.username}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
      {productos.length === 0 && (
        <div className="contenedor-no-producto h-screen w-full flex justify-center ">
          No has subido productos
        </div>
      )}
    </>
  );
};

export default Profile;
