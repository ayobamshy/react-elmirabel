import { useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { useLocation } from 'react-router-dom';

// Helper to call backend API for cart operations
async function getIdToken(user) {
  if (!user) throw new Error('User not authenticated');
  return await user.getIdToken();
}

async function fetchCart(user) {
  const idToken = await getIdToken(user);
  const res = await fetch(`/api/carts/${user.uid}`, {
    headers: { Authorization: `Bearer ${idToken}` }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  let payload;
  try {
    payload = await res.json();
  } catch (e) {
    throw new Error('Invalid JSON from /api/carts');
  }
  const { data } = payload || {};
  return data ? data.cart : null;
}

async function upsertCart(userId, cart, user) {
  const idToken = await getIdToken(user);
  const res = await fetch(`/api/carts/${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}

async function deleteCart(userId, user) {
  const idToken = await getIdToken(user);
  const res = await fetch(`/api/carts/${userId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${idToken}` }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}


export default function CartSupabaseSync() {
  const { user } = useAuth();
  const { cart, setCart, clearCart } = useCart();
  const prevUserRef = useRef();
  const location = useLocation();

  // Restore cart from backend on login
  useEffect(() => {
    if (user) {
      fetchCart(user).then(cartData => {
        if (cartData && cartData.length > 0) setCart(cartData);
      });
    }
  }, [user, setCart]);

  // Persist or delete cart on logout
  useEffect(() => {
    if (prevUserRef.current && !user) {
      // User just logged out
      const prevUserId = prevUserRef.current.uid;
      const prevUser = prevUserRef.current;
      (async () => {
        // Save cart to localStorage before clearing for persistence
        if (cart && cart.length > 0) {
          localStorage.setItem(`cart_${prevUserId}`, JSON.stringify(cart));
          await upsertCart(prevUserId, cart, prevUser);
        } else {
          localStorage.removeItem(`cart_${prevUserId}`);
          await deleteCart(prevUserId, prevUser);
        }
        clearCart();
      })();
    }
    prevUserRef.current = user;
    // eslint-disable-next-line
  }, [user]);

  // Optionally, you can listen for a custom event or location change to handle checkout cart deletion
  // (Or call deleteCart in your checkout logic directly)

  return null;
}