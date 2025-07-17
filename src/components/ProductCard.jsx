import { useCart } from './CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [showMsg, setShowMsg] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 flex flex-col overflow-hidden hover:shadow-2xl transition-transform hover:-translate-y-1 relative">
      {showMsg && (
        <div className="absolute top-3 right-3 bg-[#bfa76a] text-[#2d1a09] px-4 py-2 rounded-full shadow-lg text-sm font-semibold z-20 animate-fade-in-out">
          Added to cart!
        </div>
      )}
      <div className="aspect-w-1 aspect-h-1 w-full flex items-center justify-center overflow-hidden bg-[#f5e9c8]">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full max-w-[220px] max-h-[220px] rounded-2xl mx-auto"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[#2d1a09] mb-1">{product.name}</h3>
        <p className="text-[#4b320d]/80 text-sm mb-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="font-semibold text-[#bfa76a] text-lg">₦{product.price.toLocaleString()}</span>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(Math.max(1, Number(e.target.value)))}
            className="w-14 px-2 py-1 rounded border border-[#bfa76a]/40 text-center text-sm mr-2 focus:outline-none focus:ring-2 focus:ring-[#bfa76a]/40"
            aria-label="Quantity"
          />
          <button
            className="px-4 py-1 rounded-full bg-[#bfa76a] text-[#2d1a09] text-sm font-medium shadow hover:bg-[#f5e9c8] transition"
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Add fade-in-out animation for the toast
// In your global CSS (e.g., index.css):
// .animate-fade-in-out { animation: fadeInOut 1.5s; }
// @keyframes fadeInOut { 0%{opacity:0;} 10%{opacity:1;} 90%{opacity:1;} 100%{opacity:0;} } 