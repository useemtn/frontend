import { useState, useEffect } from "react";
import { getCarrito } from "../../logic/LogicCarrito";
import { removeProductoCarrito } from "../../logic/LogicRemoveProductoCarrito";
import "../../css/Checkout.css";
import axios from "axios";

const Checkout = () => {
  const [carrito, setCarrito] = useState(null);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    direccion: "",
    direccion_facturacion: "",
    tipo_pago: "tarjeta",
    nombre_tarjeta: "",
    num_tarjeta: "",
    fecha_vencimiento: "",
    cvc: "",
  });

  useEffect(() => {
    const obtenerCarrito = async () => {
      const carrito = await getCarrito();
      setCarrito(carrito);
      calcularTotal(carrito);
    };
    obtenerCarrito();
  }, []);

  const handleRemove = async (id) => {
    await removeProductoCarrito(id);
    const data = await getCarrito();
    setCarrito(data);
    calcularTotal(data);
  };

  const calcularTotal = (carrito) => {
    if (carrito.productos.length > 0) {
      const total = carrito.productos.reduce(
        (acc, producto) => acc + parseFloat(producto.id_producto.precio),
        0
      );
      setTotal(total);
    } else {
      setTotal(0);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      direccion: form.direccion,
      direccion_facturacion: form.direccion_facturacion,
      tipo_pago: form.tipo_pago,
    };

    if (form.tipo_pago === "tarjeta") {
      payload = {
        ...payload,
        nombre_tarjeta: form.nombre_tarjeta,
        num_tarjeta: form.num_tarjeta,
        fecha_vencimiento: form.fecha_vencimiento,
        cvc: form.cvc,
      };
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/crear_pedido/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Pedido realizado con éxito");
      console.log(payload);
      const carrito = await getCarrito();
      setCarrito(carrito);
      setTotal(0);
    } catch (error) {
      console.error(error);
      alert("Error al realizar el pedido");
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
            <input
              name="num_tarjeta"
              type="text"
              value={form.num_tarjeta}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        {carrito ? (
          <>
            {carrito.productos.map((producto, index) => (
              <div key={index} className="dropdown-item hover:bg-gray-200 mb-4 p-2 border rounded">
                <div className="nombre font-bold">{producto.id_producto.nombre}</div>
                <div className="precio">{producto.id_producto.precio} €</div>
                <div className="imagen h-20 w-20 my-2">
                  <img
                    src={
                      "http://127.0.0.1:8000" + `${producto.id_producto.imagen}`
                    }
                    alt={producto.id_producto.nombre}
                    className="h-20 w-20 object-cover"
                  />
                </div>
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
            <div className="total p-3">
              <strong>Total a pagar: {total.toFixed(2)} €</strong>
            </div>
          </>
        ) : (
          <p className="flex justify-center items-center h-auto w-auto">
            No hay productos
          </p>
        )}
      </div>
      <div className="formulario-checkout m-4 p-4 border-2 border-black rounded-xl  overflow-auto">
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
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Realizar Pago
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
