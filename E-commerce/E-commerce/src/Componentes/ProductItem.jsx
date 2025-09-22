import React from 'react';
import '../assets/styles/ProductItem.css';

function ProductItem({ name, price }) {
  return (
    <div className="product-item">
      <div className="image-placeholder">Imagen</div>
      <div className="product-details">
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
}

export default ProductItem;