import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Imágenes y estilos
import img1 from "../../public/Imagenes/Logo/Sale.gif";
import img2 from "../../public/Imagenes/Logo/Mujeres.jpg";
import img3 from "../../public/Imagenes/Logo/ColeccionHombre.jpg";
import "../assets/styles/Cartel.css";

// Data del carrusel con links por slide
const images = [
  { 
    src: img1, 
    alt: "Sale", 
    title: "Promociones", 
    link: "/Promociones" 
    
  },
  { 
    src: img2, 
    alt: "Mujeres", 
    title: "Coleccion de mujeres", 
    link: "/Mujeres" 
  },
  { 
    src: img3, 
    alt: "Hombres", 
    title: "Coleccion de hombres", 
    link: "/Hombres" 
  },
];

const Cartel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToImage = (index) => setCurrentIndex(index);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isPaused) {
      timerRef.current = setInterval(goToNext, 4500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") goToPrevious();
    if (event.key === "ArrowRight") goToNext();
  };

  const currentImage = images[currentIndex];

  return (
    <section
      className="hero-carousel"
      role="region"
      aria-label="Image carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Flecha izquierda */}
      <button
        type="button"
        className="hero-arrow left"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <span aria-hidden>‹</span>
      </button>

      {/* Parte clickable con link dinámico */}
      <Link
        to={currentImage.link}
        style={{ 
          display: 'block', 
          height: '100%', 
          textDecoration: 'none', 
          color: 'inherit',
          cursor: 'pointer'
        }}
      >
        <div className="hero-card">
          <img
            key={currentIndex}
            src={currentImage.src}
            alt={currentImage.alt}
            className="hero-image"
            draggable="false"
          />

          <div className="hero-overlay" aria-hidden="true" />

          {currentImage.title && (
            <div className="hero-caption">
              <h2>{currentImage.title}</h2>
            </div>
          )}
        </div>
      </Link>

      {/* Flecha derecha */}
      <button
        type="button"
        className="hero-arrow right"
        onClick={goToNext}
        aria-label="Next image"
      >
        <span aria-hidden>›</span>
      </button>

      {/* Indicadores (dots) */}
      <div className="hero-indicators" aria-label="carousel indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`hero-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToImage(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Cartel;