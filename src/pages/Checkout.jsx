import { useCart } from '../components/CartContext';
import { useState } from 'react';
import { useAuth, deleteCartFromSupabase } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  if (!user) return <Navigate to="/" />;

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Save order to Supabase
    const order = {
      user_id: user?.uid || user?.email,
      name: form.name,
      email: form.email,
      address: form.address,
      items: cart,
      total,
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('orders').insert([order]);
    if (!error) {
      // Delete cart from Supabase after successful order
      if (user && cart.length > 0) {
        await deleteCartFromSupabase(user.uid);
      }
      setSubmitted(true);
      clearCart();
    } else {
      alert('Order failed to save. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-2 sm:px-4 py-16 sm:py-20 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#bfa76a] mb-4">Thank you for your order!</h1>
        <p className="text-base sm:text-lg text-[#2d1a09]/80 mb-6">A confirmation email will be sent to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 p-4 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
            <label className="block mb-2 text-[#bfa76a] font-semibold text-sm sm:text-base">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 sm:px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a] text-sm sm:text-base" />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-[#bfa76a] font-semibold text-sm sm:text-base">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 sm:px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a] text-sm sm:text-base" />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-[#bfa76a] font-semibold text-sm sm:text-base">Shipping Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} required className="w-full px-3 sm:px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a] text-sm sm:text-base" rows={3} />
        </div>
        <div className="bg-[#f5e9c8] rounded-xl p-3 sm:p-4 mt-4">
          <h2 className="text-base sm:text-lg font-bold text-[#2d1a09] mb-2">Order Summary</h2>
          {cart.length === 0 ? (
            <div className="text-gray-500 text-sm sm:text-base">Your cart is empty.</div>
          ) : (
            <ul className="mb-2">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between text-[#2d1a09]/90 mb-1 text-sm sm:text-base">
                  <span>{item.name} x {item.qty}</span>
                  <span>₦{(item.price * (item.qty || 1)).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="font-bold text-[#bfa76a] text-base sm:text-lg mt-2">Total: ₦{total.toLocaleString()}</div>
        </div>
        <button type="submit" className="mt-6 px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold text-base sm:text-lg shadow hover:bg-[#f5e9c8] transition self-center disabled:opacity-50" disabled={cart.length === 0}>
          Pay with Stripe
        </button>
      </form>
    </div>
  );
}
