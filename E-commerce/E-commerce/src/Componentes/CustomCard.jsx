import React, { useState } from 'react';
import '../assets/styles/CustomCard.css';

const CustomCard = () => {
  const [hover, setHover] = useState(false);
  const [circleHover, setCircleHover] = useState(false);

  return (
    <div 
      className="custom-card d-flex justify-content-center align-items-center position-relative"
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
    >
      <div 
        className={`circle d-flex justify-content-center align-items-center ${circleHover ? 'circle-hover' : ''}`}
        onMouseEnter={() => setCircleHover(true)} 
        onMouseLeave={() => setCircleHover(false)}
      >
        <span className={`icon ${circleHover ? 'icon-hover' : ''}`}><i className='bi bi-plus-lg'></i></span>
      </div>
      {hover && (
        <div className="text">
          Cargar Producto
        </div>
      )}
    </div>
  );
}

export default CustomCard;