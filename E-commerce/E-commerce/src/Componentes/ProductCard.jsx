import { Link } from "react-router-dom";

export default function ProductCard({ producto, usuario }) {
 
  //console.log(usuario);
  const esAdmin = usuario?.perfil_id === 2;

  return (
    <div className="card h-100 m-2">
      <img src={producto.imagenUrl} className="card-img-top" alt={producto.nombre} />
      <div className="card-body ">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">${producto.precio}</p>
        {esAdmin ? (
          <Link to={`/admin/producto/${producto.id}`} className="btn btn-warning">
            Administrar
          </Link>
        ) : (
          <Link to={`/producto/${producto.id}`} className="btn btn-primary">
            Ver más
          </Link>
        )}
      </div>
    </div>
  );
}
