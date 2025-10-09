// src/Componentes/ProductCard.jsx
import { Link } from 'react-router-dom';

export default function ProductCard({ producto }) {
  return (
    <div className="card h-100 m-2">
      <img src={producto.ImagenUrl} className="card-img-top" alt={producto.nombre} />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">${producto.precio}</p>
        <Link to={`/producto/${producto.id}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  );
}

