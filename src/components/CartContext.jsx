import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const { user } = useAuth ? useAuth() : { user: null };

  // Save cart to generic key
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save cart to user-specific key
  const saveCartForUser = (userKey) => {
    if (userKey) {
      localStorage.setItem(`cart_${userKey}`, JSON.stringify(cart));
    }
  };

  // Load cart from user-specific key
  const loadCartForUser = (userKey) => {
    if (userKey) {
      const stored = localStorage.getItem(`cart_${userKey}`);
      if (stored) setCart(JSON.parse(stored));
    }
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, qty) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const clearCart = () => setCart([]);

  // Guest cart refresh warning
  useEffect(() => {
    if (!user && cart.length > 0) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [user, cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQty, clearCart, saveCartForUser, loadCartForUser }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 