import React, { useState, useEffect } from 'react';
import img1 from "../../public/Imagenes/Logo/logo.png";
import img2 from "../../public/Imagenes/Logo/HypeConColor.png";
import img3 from "../../public/Imagenes/Logo/Banner.png";
import '../assets/styles/Cartel.css';

const images = [
  { src: img1, alt: 'Image 1'  },
  { src: img2, alt: 'Image 2'},
  { src: img3, alt: 'Image 3'},
];

const Cartel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // Rotate every 4 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      goToNext();
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className="carousel"
      role="region"
      aria-label="Image carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Make the carousel focusable for keyboard navigation
    >
      <button
        onClick={goToPrevious}
        className="carousel-arrow left"
        aria-label="Previous image"
      >
          <i className="bi bi-chevron-left"></i>
      </button>
      <div className="carousel-card">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="carousel-image"
        />
        <div className="carousel-title">{currentImage.title}</div>
      </div>
      <button
        onClick={goToNext}
        className="carousel-arrow right"
        aria-label="Next image"
      >
          <i className="bi bi-chevron-right"></i>
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToImage(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Cartel;