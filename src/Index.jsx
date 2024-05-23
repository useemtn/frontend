import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      {productos.map((producto) => (
        <div key={producto.id} className="producto">
          <img
            src={producto.imagen}
/*             alt={producto.nombre} */
            className="producto-imagen"
            height={200}
            width={200}
          />
          <h2 className="producto-nombre">
            <strong>{producto.nombre}</strong>
          </h2>
          <p className="producto-descripcion">{producto.descripcion}</p>
          <p className="producto-talla">Talla: {producto.talla}</p>
          <p className="producto-precio">Precio: ${producto.precio}</p>
          <p className="producto-username">Subido por: {producto.usuario.username}</p>
        </div>
      ))}
    </div>
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
