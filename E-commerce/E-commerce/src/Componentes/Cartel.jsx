import React, { useState, useEffect, useRef } from "react";

// Declaraciones: imágenes y estilos
import img1 from "../../public/Imagenes/Logo/logo.png";
import img2 from "../../public/Imagenes/Logo/HypeConColor.png";
import img3 from "../../public/Imagenes/Logo/Banner.png";
import "../assets/styles/Cartel.css";

// Declaraciones: data del carrusel
const images = [
  { src: img1, alt: "Logo", title: "Hype" },
  { src: img2, alt: "Hype Con Color", title: "Nueva temporada" },
  { src: img3, alt: "Banner", title: "Nueva colección" },
];

const Cartel = () => {
  // Estados: índice actual y pausa por hover
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Referencia: id del intervalo (no re-renderiza)
  const timerRef = useRef(null);

  // Navegación: anterior/siguiente/ir a índice
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToImage = (index) => setCurrentIndex(index);

  // Autoplay: crea/limpia intervalo según pausa y cambios manuales
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isPaused) {
      timerRef.current = setInterval(goToNext, 4500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  // Accesibilidad: navegación por teclado
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") goToPrevious();
    if (event.key === "ArrowRight") goToNext();
  };

  // Render: imagen actual
  const currentImage = images[currentIndex];

  return (
    <section
      className="hero-carousel"
      role="region"
      aria-label="Image carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}   // pausa
      onMouseLeave={() => setIsPaused(false)}  // reanuda
    >
      {/* Controles: anterior */}
      <button
        type="button"
        className="hero-arrow left"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <span aria-hidden>‹</span>
      </button>

      {/* Render: imagen + overlay + título */}
      <div className="hero-card">
        <img
          key={currentIndex} // reinicia animación al cambiar
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

      {/* Controles: siguiente */}
      <button
        type="button"
        className="hero-arrow right"
        onClick={goToNext}
        aria-label="Next image"
      >
        <span aria-hidden>›</span>
      </button>

      {/* Indicadores: ir a imagen */}
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
