'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bambha_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('bambha_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, weight, price, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.weight === weight);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.weight === weight
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { ...product, weight, price, qty }];
    });
  };

  const removeFromCart = (id, weight) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.weight === weight)));
  };

  const updateQty = (id, weight, qty) => {
    if (qty < 1) return removeFromCart(id, weight);
    setCart(prev => prev.map(i =>
      i.id === id && i.weight === weight ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
