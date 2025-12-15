import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (item) => {
    setCarrito((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity ?? 1) + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCarrito([]); // ✅

  return (
    <CartContext.Provider value={{ carrito, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
