import { useEffect, useState } from "react";
import ProductCard from "../Componentes/ProductCard.jsx";



export default function Promociones() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5079/Producto/GetAll", {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setProductos(data.data);
      } else {
        console.warn("La respuesta no contiene un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className="lista-productos">
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productos.map((producto) => {
          return (
            <ProductCard key={producto.id} producto={producto} precio={precioFinal} />
          );
        })
      )}
    </div>
  );
}
