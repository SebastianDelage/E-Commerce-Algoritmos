import React from 'react';
import '../assets/styles/CartSidebar.css';
import ProductItem from '../assets/styles/ProductItem';

function CartSidebar({ isOpen, onClose }) {
  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>✖</button>
      <h2>Tu Carrito</h2>
      <ProductItem name="Producto 1" price="$100" />
      <ProductItem name="Producto 2" price="$200" />
      <ProductItem name="Producto 3" price="$300" />
    </div>
  );
}

export default CartSidebar;