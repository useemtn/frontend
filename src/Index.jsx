import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inicio.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener los productos
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
      <div class="contenedor-productos">
        {productos.map((producto) => (
          <a
            key={producto.id}
            class="group relative block overflow-hidden  producto  border-black border-2 rounded-lg"
            style={{ width: "400px", height: "400" }}
          >
            <button class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span class="sr-only">Wishlist</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <div className="contenedor-imagen h=100 w-100 flex justify-center content-center">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                class="h-100% w-100% object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />
            </div>

            <div
              class="relative border border-gray-100 bg-white p-6"
              style={{ width: "100%", height: "40%" }}
            >
              <h3 class="mt-4 text-lg font-medium text-gray-900">
                {producto.nombre}
              </h3>

              <p class="mt-1.5 text-sm text-gray-700">
                Talla: {producto.talla}
              </p>
              <p class="mt-1.5 text-sm text-gray-700">{producto.descripcion}</p>
              <p class="mt-1.5 text-sm text-gray-700">
                Precio: ${producto.precio}
              </p>
              <p class="mt-1.5 text-sm text-gray-700">
                Subido por: {producto.usuario.username}
              </p>

              <form class="mt-4">
                <button class="block w-full rounded bg-purple-400 p-4 text-sm font-medium transition hover:scale-105">
                  Add to Cart
                </button>
              </form>
            </div>
          </a>
        ))}
      </div>
    </>
    // Renderizar los productos
  );
};

function Index() {
  return (
    <div>
      <Productos />
    </div>
  );
}

export default Index;
