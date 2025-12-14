// src/Paginas/Mujeres.jsx
import "../assets/styles/ProductItem.css";
import ProductCard from "../Componentes/ProductCard";

export default function Mujeres({ productos, cargando, user, onUpdateProducto }) {
  // 🔥 SOLO FILTRA – NO FETCH
  const productosMujeres = productos.filter(
    (p) => Number(p.genero_id) === 2
  );

  return (
    <div className="container">
      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="row">
          {productosMujeres.map((producto) => (
            <div className="col-md-4 mb-3" key={producto.producto_id}>
              <ProductCard
                producto={producto}
                usuario={user}
                onUpdateProducto={onUpdateProducto}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
