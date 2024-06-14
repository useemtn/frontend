import { AuthContext } from "../../Context/AuthContext";
import "../../css/Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { getCarrito } from "../../logic/LogicCarrito.js";
import { removeProductoCarrito } from "../../logic/LogicRemoveProductoCarrito.js";
import { Link } from "react-router-dom";
import { fetchCategorias } from "../../logic/LogicGetCategorias.js";
import axios from "axios";
import image from "../../assets/image_brand.webp";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [carrito, setCarrito] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenProfile, setIsDropdownOpenProfile] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const categorias = await fetchCategorias();
      setCategorias(categorias);
    };

    obtenerCategorias();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calcularTotal = (carrito) => {
    if (carrito && carrito.productos.length > 0) {
      const total = carrito.productos.reduce(
        (acc, producto) => acc + parseFloat(producto.id_producto.precio),
        0
      );
      setTotal(total);
    } else {
      setTotal(0);
    }
  };

  const handleClick = async () => {
    const data = await getCarrito();
    setCarrito(data);
    calcularTotal(data);
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpenProfile(false); // Close profile dropdown if it's open
  };

  const handleClickProfile = () => {
    setIsDropdownOpenProfile(!isDropdownOpenProfile);
    setIsDropdownOpen(false); // Close cart dropdown if it's open
  };

  const handleRemove = async (id) => {
    await removeProductoCarrito(id);
    const data = await getCarrito();
    setCarrito(data);
    calcularTotal(data);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setQuery("");
    navigate(`/productos?categoria=${selectedCategory}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Token ${token}` }),
        },
      };

      const response = await axios.get(
        `https://web-production-2e42.up.railway.app/api/search/?search=${query}`,
        config
      );
      navigate("/productos", { state: { results: response.data } });
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  const isFavoritosPage = location.pathname === "/favoritos";
  const isProfilePage = location.pathname === "/perfil";
  const handleCheckout = () => {
    setIsDropdownOpen(false); // Cierra el menú del carrito
    navigate("/checkout");    // Redirige al checkout (si es necesario)
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-purple-400">
      <div className="container mx-auto px-4 py-8 flex items-center">
        <div className="mr-auto h-20 w-20 rounded-full flex-shrink-0">
          <Link to="/index">
            <img className="object-cover rounded-full" src={image} alt="Logo" />
          </Link>
        </div>

        {!isFavoritosPage && !isProfilePage && (
          <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
            <select
              className="bg-transparent uppercase font-bold text-sm p-4 mr-4"
              onChange={handleCategoryChange}
              value={
                location.search.includes("categoria")
                  ? new URLSearchParams(location.search).get("categoria")
                  : ""
              }
            >
              <option value="">Todas las Categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
            <form onSubmit={handleSearch} className="flex items-center w-full">
              <input
                className="border-l p-4 text-base border-gray-300 bg-transparent font-semibold text-sm pl-4 flex-grow"
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="ml-auto px-4 text-gray-500">
                <svg
                  className="h-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="search"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        )}

        <div className="ml-auto md:w-48 hidden sm:flex flex-col items-end"></div>

        <nav className="contents">
          <ul className="ml-4 xl:w-auto flex items-center justify-end">
            {isAuthenticated ? (
              <>
                <li
                  className="ml-2 lg:ml-4 relative inline-block"
                  ref={profileRef}
                >
                  <a href="#" onClick={handleClickProfile}>
                    <svg
                      className="h-9 lg:h-10 p-2 text-black hover:scale-110"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="user"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
                      ></path>
                    </svg>
                  </a>
                  {isDropdownOpenProfile && (
                    <div className="dropdown-menu-perfil z-50 absolute bg-white text-base float-left py-2 list-none text-left">
                      <Link
                        to="/perfil"
                        className="boton-perfil w-full flex items-center cursor-pointer justify-center hover:bg-gray-200"
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        to="/pedidos"
                        className="boton-perfil w-full flex items-center cursor-pointer justify-center hover:bg-gray-200"
                      >
                        Mis Pedidos
                      </Link>
                      <div
                        className="boton-cerrar font-bold text-red-500 flex items-center cursor-pointer justify-center w-full hover:bg-gray-200"
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        Cerrar Sesion
                      </div>
                    </div>
                  )}
                </li>
                <li className="ml-2 lg:ml-4 relative inline-block">
                  <Link to="/favoritos">
                    <svg
                      className="h-9 lg:h-10 p-2 text-black hover:scale-110"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="heart"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li
                  className="ml-2 lg:ml-4 relative inline-block"
                  ref={menuRef}
                >
                  <a href="#" onClick={handleClick}>
                    <svg
                      className="h-9 lg:h-10 p-2 text-black hover:scale-110"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="shopping-cart"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm240 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24z"
                      ></path>
                    </svg>
                  </a>
                  {isDropdownOpen && (
                    <div className="dropdown-menu absolute bg-white text-base float-left py-2 list-none text-left">
                      {carrito ? (
                        <>
                          {carrito.productos.map((producto, index) => (
                            <a
                              key={index}
                              className="dropdown-item hover:bg-gray-200"
                              href="#"
                            >
                              <div className="nombre">
                                {producto.id_producto.nombre}{" "}
                              </div>
                              <div className="precio text-purple-500">
                                {producto.id_producto.precio} €{" "}
                              </div>
                              <div className="imagen h-20 w-20">
                                <img
                                  src={
                                    "https://web-production-2e42.up.railway.app" +
                                    `${producto.id_producto.imagen}`
                                  }
                                  alt={producto.id_producto.nombre}
                                  className="h-20 w-20"
                                />
                              </div>
                              <div
                                className="basura"
                                onClick={() =>
                                  handleRemove(producto.id_producto.id)
                                }
                              >
                                <svg
                                  fill="#ff0000"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 408.483 408.483"
                                  stroke="#ff0000"
                                  height="20px"
                                  width="20px"
                                >
                                  <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path>{" "}
                                  <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path>
                                </svg>
                              </div>
                            </a>
                          ))}
                          <br></br>
                          <div className="total p-3">
                            <strong>Total a pagar: {total.toFixed(2)} €</strong>
                          </div>
                          <div className="boton-checkout flex justify-center items-center h-auto m-4">
                            <Link
                              to="/checkout"
                              className="block boton-comprar w-auto bg-purple-400 hover:bg-purple-600 p-4 text-sm font-medium transition hover:scale-105"
                              onClick={handleCheckout}
                            >
                              Realizar pago
                            </Link>
                          </div>
                        </>
                      ) : (
                        <p className="flex justify-center items-center h-auto w-auto">
                          No hay productos
                        </p>
                      )}
                    </div>
                  )}
                </li>
                <li className="ml-2 lg:ml-4 rounded-lg relative inline-block m-4 p-2 border-2 border-black bg-white font-bold text-purple-500 hover:scale-105">
                  <Link to="/vender">Vender</Link>
                </li>
              </>
            ) : (
              <>
                <li className="ml-2 cursor-pointer lg:ml-4 rounded-lg relative inline-block m-4 p-2 border-2 border-black bg-white font-bold text-purple-500 hover:scale-105">
                  <Link to="/login">Iniciar Sesión</Link>
                </li>
                <li className="ml-2 cursor-pointer lg:ml-4 rounded-lg relative inline-block m-4 p-2 border-2 border-black bg-purple-500 font-bold text-white hover:scale-105">
                  <Link to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
