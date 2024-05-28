import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "./logic/LogicProductos";
import "./css/Productos.css";
import { addToFavoritos } from "./logic/LogicAddFavoritos.js";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [enFavoritos, setEnFavoritos] = useState(false);

  const handleClickFavoritos = async (id) => {
    await addToFavoritos(id);
    setEnFavoritos(!enFavoritos);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/productos/")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los productos:", error);
      });
  }, []);


  return (
    <>
      <div className="contenedor-productos">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="contenedor-producto relative bg-white transition hover:shadow-xl p-1 mb-4"
          >
            <button
              onClick={() => handleClickFavoritos(producto.id)}
              className='absolute end-4 top-4 rounded-full p-1.5 bg-white text-gray-900 transition hover:text-gray-900/75'
            >
              <span className="sr-only">Wishlist</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <div className="contenedor-imagen flex justify-center items-center p-1">
              <img
                src={producto.imagen}
                alt={producto.nombre}
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
            <div className="mt-4">
              <form>
                <button
                  className="block boton-comprar w-full bg-purple-400 p-4 text-sm font-medium transition hover:scale-105"
                  onClick={() => addToCart(producto.id)} // Asegúrate de que producto_id está disponible aquí
                >
                  Add to Cart
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Productos;
