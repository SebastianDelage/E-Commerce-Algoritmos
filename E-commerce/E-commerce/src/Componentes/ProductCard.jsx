import { Link } from "react-router-dom";
import { useId } from "react";



export default function ProductCard({ producto }) {
  const uniqueId = useId(); 

  const handleCarouselClick = (e) => {
    e.stopPropagation();
  };

  const carouselId = `carousel-${producto.id || uniqueId}`;

  return (
    <Link
      to={producto?.id ? `/producto/${producto.id}` : "#"}
      className="text-decoration-none text-dark"
    >
      

      <div className="card h-100 m-2" style={{ cursor: "pointer" }}>
        <div id={carouselId} className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
              onClick={handleCarouselClick}
            ></button>
            <button
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to="1"
              aria-label="Slide 2"
              onClick={handleCarouselClick}
            ></button>
          </div>
          
          <div className="carousel-inner">
          {producto.imagenUrl ? (
            <>
              <div className="carousel-item active">
                <img
                  src={producto.imagenUrl}
                  className="card-img-top"
                  alt={`${producto.nombre} - Imagen 1`}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={producto.imagenUrl2}
                  className="card-img-top"
                  alt={`${producto.nombre} - Imagen 2`}
                />
              </div>
            </>
          ) : (
            <>
              <div className="carousel-item active">
                <img
                  src="http://via.placeholder.com/200"
                  className="card-img-top"
                  alt="Imagen no disponible"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="http://via.placeholder.com/200"
                  className="card-img-top"
                  alt="Imagen no disponible"
                />
              </div>
            </>
)}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="prev"
            onClick={handleCarouselClick}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="next"
            onClick={handleCarouselClick}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text">${producto.precio}</p>
        </div>
      </div>
    </Link>
  );
}

