import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeProduct } from "../../logic/LogicRemoveProducto";
import { removeUser } from "../../logic/LogicRemoveUsuario";
import EditProduct from "../EditarProducto/EditProduct";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import EditUserFieldDialog from "../EditUserDialog/EditUserDialog";
import ConfirmUserDialog from "../ConfirmUserDialog/ConfirmUserDialog";
import { FaEdit } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../css/Productos.css";

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
          setUsuarios(response.data[0]);
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

  const handleRemoveProduct = async (productId) => {
    const status = await removeProduct(productId);
    if (status === 204) {
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== productId)
      );
      setEliminarProducto(null);
    }
  };

  const handleRemoveUser = async () => {
    const status = await removeUser();
    if (status) {
      navigate("/");
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === updatedProduct.id ? updatedProduct : producto
      )
    );
    setEditProduct(null);
  };

  const handleUpdateUser = (field, value) => {
    setUsuarios((prevUsuarios) => ({
      ...prevUsuarios,
      [field]: value,
    }));
  };

  const openConfirmDialog = (productId) => {
    setEliminarProducto(productId);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setEliminarProducto(null);
    setConfirmDialogOpen(false);
  };

  const openConfirmUserDialog = () => {
    setConfirmUserDialogOpen(true);
  };

  const closeConfirmUserDialog = () => {
    setConfirmUserDialogOpen(false);
  };

  const confirmDeleteProduct = () => {
    if (eliminarProducto) {
      handleRemoveProduct(eliminarProducto);
    }
    closeConfirmDialog();
  };

  return (
    <>
      <div className="contenedor-perfil w-full h-96 grid grid-cols-1 md:grid-cols-2 place-items-center mt-5 mb-3">
        <div className="contenedor-perfil-img relative bg-transparent z-10 w-64 h-64 rounded-full overflow-hidden border-2 border-black">
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
      <div className="contenedor-productos">
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
                                  : `http://127.0.0.1:8000${img}`
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
                            : `http://127.0.0.1:8000${producto.imagen}`
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
