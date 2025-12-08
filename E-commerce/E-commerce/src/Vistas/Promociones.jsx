import { useEffect, useState } from "react";
import ProductCard from "../Componentes/ProductCard.jsx";

export default function Promociones() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5079/Producto/GetProductoPromocion?estado=1", {
        method: "GET",
        mode: "cors",
      });
      const data = await response.json();

      if (Array.isArray(data.data)) {
        console.log(data.data)
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


const productosPorPromo = productos.reduce((grupos, producto) => {
  const promo = producto.nombrePromo;
  (grupos[promo] ??= []).push(producto);
  return grupos;
}, {});


return (
  <div className="container">
    {Object.keys(productosPorPromo).map((promoNombre) => (
      <div key={promoNombre} className="mb-5">
        {/* No mostramos el h2 si es undefined o "undefined" */}
        {promoNombre && promoNombre !== "undefined" && (
          <h2 className="text-center text-uppercase mb-4">
            {promoNombre}
          </h2>
        )}

        <div className="row">
          {productosPorPromo[promoNombre].map((producto) => (
            <div className="col-md-4 mb-3" key={producto.producto_id}>
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);


}
