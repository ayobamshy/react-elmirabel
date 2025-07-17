import { useCart } from '../components/CartContext';
import { useState } from 'react';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would call your backend to create a Stripe Checkout session
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#bfa76a] mb-4">Thank you for your order!</h1>
        <p className="text-lg text-[#2d1a09]/80 mb-6">A confirmation email will be sent to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block mb-2 text-[#bfa76a] font-semibold">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a]" />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-[#bfa76a] font-semibold">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a]" />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-[#bfa76a] font-semibold">Shipping Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} required className="w-full px-4 py-2 border border-[#bfa76a]/30 rounded-lg focus:ring-2 focus:ring-[#bfa76a]" rows={3} />
        </div>
        <div className="bg-[#f5e9c8] rounded-xl p-4 mt-4">
          <h2 className="text-lg font-bold text-[#2d1a09] mb-2">Order Summary</h2>
          {cart.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <ul className="mb-2">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between text-[#2d1a09]/90 mb-1">
                  <span>{item.name} x {item.qty}</span>
                  <span>₦{(item.price * (item.qty || 1)).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="font-bold text-[#bfa76a] text-lg mt-2">Total: ₦{total.toLocaleString()}</div>
        </div>
        <button type="submit" className="mt-6 px-8 py-3 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold text-lg shadow hover:bg-[#f5e9c8] transition self-center disabled:opacity-50" disabled={cart.length === 0}>
          Pay with Stripe
        </button>
      </form>
    </div>
  );
}
