import React from 'react';
import '../assets/styles/Navbar.css';
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

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
export default function CartIcon({ onClick }) {
  const { carrito } = useContext(CartContext);

  const totalItems = carrito.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div
      onClick={onClick}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <FaShoppingCart size={24} />

      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-8px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
}

//export default Navbar;