// src/Componentes/ProductCard.jsx
import { Link } from 'react-router-dom';

export default function ProductCard({ producto }) {
  return (
    <Link
      to={`/producto/${producto.id}`}
      className="text-decoration-none text-dark"
      style={{ flex: '1 0 200px' }}
    >
      <div className="card h-100 m-2" style={{ cursor: 'pointer' }}>
        <img
          src={producto.imagenUrl}
          className="card-img-top"
          alt={producto.nombre}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">${producto.precio}</p>
        </div>
      </div>
    </Link>
  );
}

