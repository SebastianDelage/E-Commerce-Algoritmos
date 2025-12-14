// src/Paginas/Home.jsx
import "../assets/styles/Home.css";
import ProductCard from "../Componentes/ProductCard";
import Cartel from "../Componentes/Cartel";

export default function Home({
  productos,
  cargando,
  user,
  onUpdateProducto,
}) {
  return (
    <div className="container">
      <div className="row">
        <Cartel />
      </div>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="row">
          {productos.map((producto) => (
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
