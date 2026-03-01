// src/Componentes/CartSlide.jsx
import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import "../assets/styles/CartSlide.css";

// Endpoint crear orden
const API_CREATE_ORDEN = "http://localhost:5079/Orden/CreateOrden";

export default function CartSlide({ show, onClose, usuario }) {
  // Context carrito
  const { carrito, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  // Estado UI
  const [isBuying, setIsBuying] = useState(false);

  // Total
  const total = useMemo(() => {
    return carrito.reduce((acc, item) => {
      const price = Number(item.price ?? 0);
      const qty = Number(item.quantity ?? 1);
      return acc + price * qty;
    }, 0);
  }, [carrito]);

  // Comprar: validación + API
  const handleComprar = async () => {
    if (!carrito || carrito.length === 0) return;

    // Validación sesión
    const usuario_id = Number(usuario?.usuario_id ?? usuario?.id_usuario ?? usuario?.id);
    if (!usuario_id) {
      alert("Tenés que iniciar sesión para comprar.");
      return;
    }

    // Payload orden
    const fecha = new Date().toISOString().slice(0, 19);
    const totalNumber = Number(total.toFixed(2));

    const payload = {
      usuario_id,
      fecha,
      estado: 1,
      total: totalNumber,
    };

    try {
      setIsBuying(true);

      const resp = await fetch(API_CREATE_ORDEN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await resp.text();
      let json = {};
      try { json = raw ? JSON.parse(raw) : {}; } catch {}

      if (!resp.ok || json?.success === false) {
        console.error(resp.status, json || raw);
        alert("No se pudo crear la orden");
        return;
      }

      clearCart();
      onClose?.();
      alert("Compra realizada");
    } catch (e) {
      console.error(e);
      alert("Error al comprar");
    } finally {
      setIsBuying(false);
    }
  };

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
              <span>${Number(item.price ?? 0)} x {Number(item.quantity ?? 1)}</span>
            </div>

            {/* Controles de cantidad */}
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
              >
                <FaMinus size={16} />
              </button>
              <span className="qty">{item.quantity ?? 1}</span>
              <button
                className="qty-btn"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <FaPlus size={16} />
              </button>
            </div>

            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
              <FaTimes size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Total + Comprar */}
      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button className="cart-buy-btn" onClick={handleComprar} disabled={isBuying || carrito.length === 0}>
          {isBuying ? "Procesando..." : "Comprar"}
        </button>
      </div>
    </div>
  );
}