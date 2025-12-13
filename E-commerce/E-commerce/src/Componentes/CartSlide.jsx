import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes } from "react-icons/fa";
import "../assets/styles/CartSlide.css";

export default function CartSlide({ show, onClose }) {
  const { carrito, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (carrito.length === 0) {
    return (
      <div className={`cart-sidebar ${show ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Mi Carrito</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes size={24} />
          </button>
        </div>
        <div className="cart-empty">
          <p>Tu carrito está vacío</p>
          <button className="btn-continue" onClick={onClose}>
            Seguir comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`cart-sidebar ${show ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Mi Carrito ({carrito.length} productos)</h3>
        <button className="close-btn" onClick={onClose}>
          <FaTimes size={24} />
        </button>
      </div>

      <div className="cart-body">
        {carrito.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="item-image" />

            <div className="item-details">
              <h4>{item.name}</h4>
              {item.size && <p>Talle: {item.size}</p>}
              {item.color && <p>Color: {item.color}</p>}
              <p className="item-price">${item.price}</p>

              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              <FaTimes size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="total">
          <span>Total:</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button className="btn-clear" onClick={clearCart}>
          Vaciar carrito
        </button>

        <button className="btn-checkout">
          Ir al checkout
        </button>
      </div>
    </div>
  );
}