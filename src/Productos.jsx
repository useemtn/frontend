import { useEffect, useState, useContext } from 'react';
import { AuthContext } from "./Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { addToCart } from "./logic/LogicProductos";
import "./css/Productos.css";
import { FavoritosContext } from "./Context/FavoritosContext";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { productosFavoritos, handleClickFavoritos } = useContext(FavoritosContext);
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    document.title = "Inicio";
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = token
          ? {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          : {};

        const response = await axios.get(
          "https://web-production-2e42.up.railway.app/api/productos/",
          config
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    if (location.state?.results) {
      setSearchResults(location.state.results);
    } else {
      setSearchResults([]);
    }
  }, [location.state]);

  const query = new URLSearchParams(location.search);
  const categoria = query.get("categoria");

  const filteredProductos = categoria
    ? productos.filter((producto) => producto.categoria === categoria)
    : productos;

  const productosAMostrar = searchResults.length > 0 ? searchResults : filteredProductos;

  const handleAddToCart = (event, productoId) => {
    event.preventDefault();
    addToCart(productoId);
  };

  return (
    <div className="contenedor-productos">
      {productosAMostrar.length === 0 ? (
        <div className="flex h-screen justify-center items-center">
          No hay productos
        </div>
      ) : (
        productosAMostrar.map((producto) => {
          const imagenes = [producto.imagen, producto.imagen2, producto.imagen3, producto.imagen4, producto.imagen5].filter(img => img);

          return (
            <div
              key={producto.id}
              className="contenedor-producto relative bg-white transition p-1 mb-4"
            >
              {isAuthenticated && (
                <button
                  onClick={() => handleClickFavoritos(producto.id)}
                  className={`absolute end-4 z-10 top-4 hover:scale-125 rounded-full p-1.5 transition ${
                    productosFavoritos[producto.id] ? "bg-red-500" : "bg-white"
                  }`}
                >
                  <span className="sr-only">Wishlist</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 hover:scale-105"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              )}
              <div className="contenedor-imagen flex justify-center items-center p-1">
                {imagenes.length > 1 ? (
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop={true}
                    emulateTouch={true}
                    autoPlay={true}
                    interval={3000}
                  >
                    {imagenes.map((img, index) => (
                      <div key={index}>
                        <img
                          alt={producto.nombre}
                          src={img.startsWith("http") ? img : `https://web-production-2e42.up.railway.app${img}`}
                          className="object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <img
                    alt={producto.nombre}
                    src={producto.imagen.startsWith("http") ? producto.imagen : `https://web-production-2e42.up.railway.app${producto.imagen}`}
                    className="object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />
                )}
              </div>
              <div className="relative border border-gray-100 bg-white p-6">
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
                  {producto.categoria}
                </p>
                <p className="mt-1.5 text-sm text-gray-700">
                  Precio: {producto.precio} €
                </p>
                <div className="mt-1.5 flex items-center">
                  <img
                    src={
                      producto.id_usuario.imagen
                        ? producto.id_usuario.imagen.startsWith("http")
                          ? producto.id_usuario.imagen
                          : `https://web-production-2e42.up.railway.app${producto.id_usuario.imagen}`
                        : ""
                    }
                    className="w-10 h-10 rounded-full mr-2 border-2 border-black"
                    alt={producto.id_usuario.username}
                  />
                  <Link
                    to={`/user/${producto.id_usuario.id}`}
                    className="text-sm text-gray-700 hover:underline"  
                  >
                    {producto.id_usuario.username}
                  </Link>
                </div>
              </div>
              {isAuthenticated && (
                <div className="mt-4">
                  <form>
                    <button
                      className="block boton-comprar bg-purple-400 p-4 text-sm font-medium transition"
                      onClick={(event) => handleAddToCart(event, producto.id)}
                    >
                      Añadir al carrito
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Productos;