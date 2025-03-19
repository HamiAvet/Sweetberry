import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    let ordersList = JSON.parse(localStorage.getItem("cart")) || {};
    let totalcount = 0;
    Object.keys(ordersList).forEach((key, value) => {
      totalcount += ordersList[key].Quantity;
    })
    if (totalcount === 0) {
        setCartCount(null)
    } else {
      setCartCount(totalcount)
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
