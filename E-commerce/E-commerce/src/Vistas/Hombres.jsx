// src/Paginas/Hombres.jsx
import "../assets/styles/ProductItem.css";
import ProductCard from "../Componentes/ProductCard";

export default function Hombres({ productos, cargando, user, onUpdateProducto }) {
  const productosHombres = productos.filter(
    (p) => Number(p.genero_id) === 1
  );

  return (
    <div className="container">
      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="row">
          {productosHombres.map((producto) => (
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
