// src/context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = localStorage.getItem("carrito");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const addToCart = (item) => {
    setCarrito((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: (p.quantity ?? 1) + (item.quantity ?? 1) }
            : p
        );
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCarrito((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity ?? 1) + delta;
            if (newQty <= 0) return null; // se elimina si llega a 0 o menos
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean); // elimina los null
    });
  };

  const clearCart = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const value = {
    carrito,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};