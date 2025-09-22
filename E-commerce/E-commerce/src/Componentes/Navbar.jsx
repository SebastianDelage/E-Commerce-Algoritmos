import React from 'react';
import '../assets/styles/Navbar.css';

function Navbar({ onCartClick }) {
  return (
    <nav className="navbar">
      <h1>Mi Tienda</h1>
      <button className="cart-button" onClick={onCartClick}>
        🛒
      </button>
    </nav>
  );
}

export default Navbar;