import { useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { supabase } from '../supabaseClient';
import { useLocation } from 'react-router-dom';

// Helper to delete cart from Supabase
export async function deleteCartFromSupabase(userId) {
  await supabase.from('carts').delete().eq('user_id', userId);
}

export default function CartSupabaseSync() {
  const { user } = useAuth();
  const { cart, setCart, clearCart } = useCart();
  const prevUserRef = useRef();
  const location = useLocation();

  // Restore cart from Supabase on login
  useEffect(() => {
    if (user) {
      supabase.from('carts').select('cart').eq('user_id', user.uid).single().then(({ data }) => {
        if (data && data.cart) setCart(data.cart);
      });
    }
  }, [user, setCart]);

  // Persist or delete cart on logout
  useEffect(() => {
    if (prevUserRef.current && !user) {
      // User just logged out
      const prevUserId = prevUserRef.current.uid;
      (async () => {
        // Save cart to localStorage before clearing for persistence
        if (cart && cart.length > 0) {
          localStorage.setItem(`cart_${prevUserId}`, JSON.stringify(cart));
          await supabase.from('carts').upsert({ user_id: prevUserId, cart });
        } else {
          localStorage.removeItem(`cart_${prevUserId}`);
          await deleteCartFromSupabase(prevUserId);
        }
        clearCart();
      })();
    }
    prevUserRef.current = user;
    // eslint-disable-next-line
  }, [user]);

  // Optionally, you can listen for a custom event or location change to handle checkout cart deletion
  // (Or call deleteCartFromSupabase in your checkout logic directly)

  return null;
} 