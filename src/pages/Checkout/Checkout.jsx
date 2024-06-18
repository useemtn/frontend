// Importar los componentes necesarios
import { useState, useEffect } from "react";
import { getCarrito } from "../../logic/LogicCarrito";
import { removeProductoCarrito } from "../../logic/LogicRemoveProductoCarrito";
import "../../css/Checkout.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import sha256 from 'crypto-js/sha256';

// Función para realizar el pedido
const Checkout = () => {
  // Variables de estado
  const [carrito, setCarrito] = useState(null);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    // Establecer valores por defecto
    direccion: "",
    direccion_facturacion: "",
    tipo_pago: "tarjeta",
    nombre_tarjeta: "",
    num_tarjeta: "",
    fecha_vencimiento: "",
    cvc: "",
  });
  // Funciones de estado
  useEffect(() => {
    document.title = "Checkout";
    // Función para obtener el carrito
    const obtenerCarrito = async () => {
      const carrito = await getCarrito();
      setCarrito(carrito);
      calcularTotal(carrito); // Llamar a la función para calcular el total
    };

    // Llamar a la función para obtener el carrito
    obtenerCarrito();
  }, []);

  // Manejadores de eliminar un producto del carrito
  const handleRemove = async (id) => {
    await removeProductoCarrito(id); // Llamar a la función para eliminar el producto
    const data = await getCarrito();
    setCarrito(data); // Establecer el carrito actualizado
    calcularTotal(data); 
  };

  // Función para calcular el total
  const calcularTotal = (carrito) => {
    // Si los productos del carrito tienen elementos calcular el total
    if (carrito.productos.length > 0) {
      const total = carrito.productos.reduce(
        (acc, producto) => acc + parseFloat(producto.id_producto.precio),
        0
      );
      // Establecer el total
      setTotal(total);
    } else {
      setTotal(0);
    }
  };

  // Manejadores de formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Manejadores de tarjeta
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    if (value.length > 16) {
      value = value.slice(0, 16); // Limitar a 16 digitos
    }
    // Add space after every 4 digits
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Agregar espacio despues de cada 4 digitos
    // Establecer el valor de la tarjeta
    setForm({
      ...form,
      num_tarjeta: formattedValue,
    });
  };

  // Manejadores de CVV
  const handleCVCChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    if (value.length > 3) {
      value = value.slice(0, 3); // Limitar a 3 digitos
    }
    // Establecer el valor cvv
    setForm({
      ...form,
      cvc: value,
    });
  };

  // Función para realizar el pedido
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que el carrito no esté vacío
    if (!carrito || carrito.productos.length === 0) {
      toast.error('El carrito está vacío. No se puede realizar el pedido.');
      return;
    }
    // Crear el objeto de pedido
    let payload = {
      direccion: form.direccion,
      direccion_facturacion: form.direccion_facturacion,
      tipo_pago: form.tipo_pago,
    };

    if (form.tipo_pago === "tarjeta") {
      // Verificar que los campos de tarjeta no estén vacíos
      if (!form.nombre_tarjeta || !form.num_tarjeta || !form.fecha_vencimiento || !form.cvc) {
        toast.error('Todos los campos de la tarjeta son requeridos.');
        return;
      }

      // Hashear la información sensible y truncar los hashes
      const hashed_num_tarjeta = sha256(form.num_tarjeta.replace(/\s/g, '')).toString().substring(0, 16); // Remove spaces before hashing
      const hashed_cvc = sha256(form.cvc).toString().substring(0, 3);

      // Agregar los datos de la tarjeta al objeto de pedido
      payload = {
        ...payload,
        nombre_tarjeta: form.nombre_tarjeta,
        num_tarjeta: hashed_num_tarjeta,
        fecha_vencimiento: form.fecha_vencimiento,
        cvc: hashed_cvc,
      };
    }

    try {
      // Llamar a la API para realizar el pedido
      const response = await axios.post(
        "https://web-production-2e42.up.railway.app/api/crear_pedido/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success('Pedido realizado con éxito'); // Notificación de éxito
      const carrito = await getCarrito(); // Obtener el carrito
      // Establecer el carrito actualizado
      setCarrito(carrito);
      // Establecer el total a 0 una vez que se realiza el pedido
      setTotal(0);
      setForm({
        direccion: "",
        direccion_facturacion: "",
        tipo_pago: "tarjeta",
        nombre_tarjeta: "",
        num_tarjeta: "",
        fecha_vencimiento: "",
        cvc: "",
      }); // Resetear el formulario después de un pedido exitoso
    } catch (error) {
      console.error('Error al realizar el pedido:', error.response.data);
      toast.error(`Error al realizar el pedido: ${error.response.data}`);
    }
  };

  const renderPaymentFields = () => {
    if (form.tipo_pago === "tarjeta") {
      return (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nombre_tarjeta"
            >
              Nombre en la Tarjeta
            </label>
            {/*Manejar el envío del formulario*/}
            <input
              name="nombre_tarjeta"
              type="text"
              value={form.nombre_tarjeta}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="num_tarjeta"
            >
              Número de Tarjeta
            </label>
            {/*Manejar el envío del numero de tarjeta*/}
            <input
              name="num_tarjeta"
              type="text"
              value={form.num_tarjeta}
              onChange={handleCardNumberChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="19" // 16 digits + 3 spaces
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fecha_vencimiento"
            >
              Fecha de Vencimiento
            </label>
            <input
              name="fecha_vencimiento"
              type="date"
              value={form.fecha_vencimiento}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cvc"
            >
              CVC
            </label>
            <input
              name="cvc"
              type="text"
              value={form.cvc}
              onChange={handleCVCChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="3"
            />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="body-checkout grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="carrito-checkout m-4 p-4 border-2 border-black rounded-xl overflow-auto">
        {/* Mostrar el carrito */}
        {carrito ? (
          <>
            {carrito.productos.map((producto, index) => (
              <div key={index} className="dropdown-item hover:bg-gray-200 mb-4 p-2 border rounded">
                <div className="nombre font-bold">{producto.id_producto.nombre}</div>
                <div className="precio">{producto.id_producto.precio} €</div>
                <div className="imagen h-20 w-20 my-2">
                  <img
                    src={
                      "https://web-production-2e42.up.railway.app" + `${producto.id_producto.imagen}`
                    }
                    alt={producto.id_producto.nombre}
                    className="h-20 w-20 object-cover"
                  />
                </div>
                {/* Botón para eliminar el producto */}
                <div
                  className="basura cursor-pointer"
                  onClick={() => handleRemove(producto.id_producto.id)}
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
              </div>
            ))}

            {/* Mostrar el total */}
            <div className="total p-3">
              <strong>Total a pagar: <span className="text-purple-500">{total.toFixed(2)}</span> €</strong>
            </div>
          </>
        ) : (
          <p className="flex justify-center items-center h-auto w-auto">
            {/* Mostrar el mensaje si no hay productos */}
            No hay productos
          </p>
        )}
      </div>

      {/* Formulario */}
      <div className="formulario-checkout m-4 p-4 border-2 border-black rounded-xl overflow-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="direccion"
            >
              Dirección
            </label>
            <input
              name="direccion"
              type="text"
              value={form.direccion}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="direccion_facturacion"
            >
              Dirección de Facturación
            </label>
            <input
              name="direccion_facturacion"
              type="text"
              value={form.direccion_facturacion}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tipo_pago"
            >
              Tipo de Pago
            </label>
            <select
              name="tipo_pago"
              value={form.tipo_pago}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="tarjeta">Tarjeta</option>
              <option value="paypal">Paypal</option>
              <option value="contrarreembolso">Contrarreembolso</option>
            </select>
          </div>

          {renderPaymentFields()}
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition"
          >
            Realizar Pago
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Checkout;
