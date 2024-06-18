// Importar los componentes necesarios
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeProduct } from "../../logic/LogicRemoveProducto";
import { removeUser } from "../../logic/LogicRemoveUsuario";
import EditProduct from "../../components/EditarProducto/EditProduct";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import EditUserFieldDialog from "../../components/EditUserDialog/EditUserDialog";
import ConfirmUserDialog from "../../components/ConfirmUserDialog/ConfirmUserDialog";
import { FaEdit } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../css/Productos.css";

// Función para obtener los productos
const Profile = () => {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [editProduct, setEditProduct] = useState(null);
  const [editField, setEditField] = useState(null);
  const [eliminarProducto, setEliminarProducto] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmUserDialogOpen, setConfirmUserDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Mi Perfil";
    // Función para obtener los productos
    const fetchProductos = async () => {
      try {
        // Obtener los productos a través de la API
        const response = await axios.get(
          "https://web-production-2e42.up.railway.app/api/productos/get/usuario/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Productos:", response.data);
        // Almacenar los productos en el estado
        setProductos(response.data);
      } catch (error) {
        // Mostrar un mensaje de error
        console.error("Hubo un error al obtener los productos:", error);
      }
    };
    // Función para obtener los usuarios
    const fetchUsuarios = async () => {
      try {
        // Obtener los usuarios a través de la API
        const response = await axios.get(
          "https://web-production-2e42.up.railway.app/api/usuarios/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Usuarios:", response.data);
        // Verifica si response.data es un array y si tiene al menos un elemento
        if (Array.isArray(response.data) && response.data.length > 0) {
        // Asigna el primer elemento del array a la función setUsuarios
          setUsuarios(response.data[0]);
        } else {
        // Si response.data está vacío o no es un array, asigna directamente a setUsuarios
          setUsuarios(response.data);
        }

      } catch (error) {
        console.error("Hubo un error al obtener los usuarios:", error);
      }
    };

    // Llamar a las funciones
    fetchProductos();
    fetchUsuarios();
  }, []);

  // Funciones de estado obteniendo la id del producto
  const handleRemoveProduct = async (productId) => {
    // Llamar a la API para eliminar el producto
    const status = await removeProduct(productId);
    if (status === 204) {
      setProductos((prevProductos) => // Filtrar los productos que no coincidan con el id
        prevProductos.filter((producto) => producto.id !== productId) // Devuelve todos los productos excepto el que coincida con el id
      );
      // Cierra el diálogo de confirmación
      setEliminarProducto(null);
    }
  };

  // Función para eliminar un usuario
  const handleRemoveUser = async () => {
    // Llamar a la API para eliminar el usuario
    const status = await removeUser();
    if (status) { // Verifica si la respuesta es exitosa
      // Redirigir al usuario a la página de inicio
      navigate("/");
    }
  };

  // Función para actualizar un producto
  const handleUpdateProduct = (updatedProduct) => {
    // Actualizar el estado de los productos
    setProductos((prevProductos) =>
      prevProductos.map((producto) => // Mapear los productos y actualizar el que coincida con el id
        producto.id === updatedProduct.id ? updatedProduct : producto // Si el id coincide, devolver el nuevo producto, de lo contrario devolver el producto existente
      )
    );
    // Cerrar el diálogo de edición
    setEditProduct(null);
  };

  // Función para actualizar un usuario
  const handleUpdateUser = (field, value) => {
    // Actualizar el estado de los usuarios
    setUsuarios((prevUsuarios) => ({
      ...prevUsuarios,
      [field]: value,
    }));
  };

  // Función para abrir el diálogo de confirmación
  const openConfirmDialog = (productId) => {
    // Asignar el id del producto
    setEliminarProducto(productId);
    // Abrir el diálogo de confirmación
    setConfirmDialogOpen(true);
  };

  // Función para cerrar el diálogo de confirmación
  const closeConfirmDialog = () => {
    // Cerrar el diálogo de confirmación
    setEliminarProducto(null);
    setConfirmDialogOpen(false);
  };

  // Función para abrir el diálogo de confirmación de usuario
  const openConfirmUserDialog = () => {
    // Establecer el estado de confirmUserDialogOpen en true
    setConfirmUserDialogOpen(true);
  };

  // Función para cerrar el diálogo de confirmación de usuario
  const closeConfirmUserDialog = () => {
    // Establecer el estado de confirmUserDialogOpen en false
    setConfirmUserDialogOpen(false);
  };
  
  // Función para confirmar la eliminación de un producto
  const confirmDeleteProduct = () => {
    if (eliminarProducto) { // Si existe el id del producto
      handleRemoveProduct(eliminarProducto); // Llamar a la función para eliminar el proyecto
    }
    // Cerrar el diálogo de confirmación
    closeConfirmDialog();
  };

  return (
    <>
      <div className="contenedor-perfil w-full h-96 grid grid-cols-1 md:grid-cols-2 place-items-center mt-5 mb-3">
        <div className="contenedor-perfil-img relative bg-transparent z-10 w-64 h-64 rounded-full overflow-hidden border-2 border-black">
          {/* Imagen de perfil del usuario */}
          {usuarios.imagen ? (
            <img
              src={`${usuarios.imagen}`}
              alt="Imagen de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <p>Imagen no disponible</p>
          )}
        </div>
        <div className="contenedor-perfil-info">
          <h1>
            {/* Nombre del usuario e icono para editar */}
            {usuarios.username}{" "}
            <FaEdit
              className="inline text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setEditField("username")}
            />
          </h1>
          <p>
            {usuarios.email}{" "}
            <FaEdit
              className="inline text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setEditField("email")}
            />
          </p>
          <p>
            {usuarios.direccion}{" "}
            <FaEdit
              className="inline text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setEditField("direccion")}
            />
          </p>
          <p>{usuarios.fecha_creacion}</p>
          <p>
            Cambiar Contraseña{" "}
            <FaEdit
              className="inline text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setEditField("password")}
            />{" "}
          </p>
          <p>
            Cambiar imagen{" "}
            <FaEdit
              className="inline text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setEditField("imagen")}
            />
          </p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4"
            onClick={openConfirmUserDialog}
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>
      <div className="contenedor-productos mt-16">
        {/* Si existen productos se muestran junto con sus datos  */}
        {productos.length > 0
          ? productos.map((producto) => {
              const imagenes = [
                producto.imagen,
                producto.imagen2,
                producto.imagen3,
                producto.imagen4,
                producto.imagen5,
              ].filter((img) => img);

              return (
                <div
                  key={producto.id}
                  className="contenedor-producto relative bg-white transition p-1 mb-4"
                >
                  <div className="contenedor-imagen flex justify-center items-center p-1">
                    {/* Mostrar un carrousel si hay más de una imagen */}
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
                              src={
                                img.startsWith("http")
                                  ? img
                                  : `https://web-production-2e42.up.railway.app${img}`
                              }
                              className="object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                            />
                          </div>
                        ))}
                      </Carousel>
                    ) : (
                      <img
                        alt={producto.nombre}
                        src={
                          producto.imagen.startsWith("http")
                            ? producto.imagen
                            : `https://web-production-2e42.up.railway.app${producto.imagen}`
                        }
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
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      className="text-white flex justify-center w-auto boton-editar font-bold bg-purple-500 hover:bg-purple-600 p-4 text-sm font-medium transition"
                      onClick={() => setEditProduct(producto)}
                    >
                      Editar producto
                    </button>
                    <button
                      className="text-white flex justify-center w-auto font-bold boton-eliminar bg-red-500 hover:bg-red-600 p-4 text-sm font-medium transition"
                      onClick={() => openConfirmDialog(producto.id)}
                    >
                      Eliminar producto
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {/* Si no hay productos se muestra un mensaje  */}
      {productos.length === 0 && (
        <div className="contenedor-no-producto h-screen w-full flex justify-center ">
          No has subido productos
        </div>
      )}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setEditProduct(null)}
            >
              &times;
            </button>
            <EditProduct product={editProduct} onUpdate={handleUpdateProduct} />
          </div>
        </div>
      )}
      {/* Dialogo de confirmación para eliminar el producto o usuario */}
      <ConfirmDialog
        isOpen={confirmDialogOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDeleteProduct}
        message="¿Estás seguro que quieres eliminar este producto?"
      />
      <EditUserFieldDialog
        isOpen={editField !== null}
        onClose={() => setEditField(null)}
        user={usuarios}
        field={editField}
        onUpdate={handleUpdateUser}
      />
      <ConfirmUserDialog
        isOpen={confirmUserDialogOpen}
        onClose={closeConfirmUserDialog}
        onConfirm={handleRemoveUser}
        message="¿Estás seguro que quieres eliminar tu cuenta?"
      />
    </>
  );
};

export default Profile;
