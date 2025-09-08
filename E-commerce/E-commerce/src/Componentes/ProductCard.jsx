import { Link } from 'react-router-dom';

export default function ProductCard({ producto }) {
  return (
    <div className="card h-100">
      <img src={producto.image} className="card-img-top" alt={producto.name} />
      <div className="card-body">
        <h5 className="card-title">{producto.name}</h5>
        <p className="card-text">${producto.price}</p>
        <Link to={`/producto/${producto.id}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  );
}
