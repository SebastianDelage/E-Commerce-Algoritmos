import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";

export default function CartSlide({ show, onClose }) {
  const { carrito, removeFromCart } = useContext(CartContext);

  return (
    <div className={`cart-sidebar ${show ? "open" : ""}`}>
      <div className="cart-header">
        <button className="close-btn" onClick={onClose}>
          <FaTimes size={20} />
        </button>
      </div>

      <div className="cart-body">
        {carrito.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <span>{item.name}</span>
              <span>{item.size}</span>
              <span>{item.color}</span>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              <FaTimes size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
