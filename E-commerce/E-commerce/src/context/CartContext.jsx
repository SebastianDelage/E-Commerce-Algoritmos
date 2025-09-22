import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (item) => {
    setCarrito((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ carrito, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
