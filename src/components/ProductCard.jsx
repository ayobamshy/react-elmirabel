import { useCart } from './CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, imageLinkTo }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [showMsg, setShowMsg] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 flex flex-col overflow-hidden hover:shadow-2xl transition-transform hover:-translate-y-1 relative w-full max-w-xs mx-auto sm:max-w-sm md:max-w-none h-[500px]">
      {showMsg && (
        <div className="absolute top-3 right-3 bg-[#bfa76a] text-[#2d1a09] px-4 py-2 rounded-full shadow-lg text-sm font-semibold z-20 animate-fade-in-out">
          Added to cart!
        </div>
      )}
      <div className="w-full h-56 flex items-center justify-center overflow-hidden bg-[#f5e9c8]">
        {imageLinkTo ? (
          <Link to={imageLinkTo} tabIndex={0} aria-label={`View ${product.name} in catalog`} style={{ display: 'block', width: '100%', height: '100%' }}>
            <img
              src={product.image || '/images/placeholder.png'}
              alt={product.name}
              className="object-cover w-full h-full rounded-2xl mx-auto cursor-pointer hover:opacity-80 transition"
              loading="lazy"
              onError={e => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
            />
          </Link>
        ) : (
          <img
            src={product.image || '/images/placeholder.png'}
            alt={product.name}
            className="object-cover w-full h-full rounded-2xl mx-auto"
            loading="lazy"
            onError={e => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
          />
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg sm:text-xl text-[#2d1a09] mb-1">{product.name}</h3>
        <p className="text-[#4b320d]/80 text-sm sm:text-base mb-2 flex-1 line-clamp-2">{product.description}</p>
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between mt-2 gap-2 xs:gap-2">
          <span className="font-semibold text-[#bfa76a] text-lg sm:text-xl">₦{product.price.toLocaleString()}</span>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(Math.max(1, Number(e.target.value)))}
            className="w-16 px-2 py-1 rounded border border-[#bfa76a]/40 text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#bfa76a]/40"
            aria-label="Quantity"
          />
          <button
            className="px-4 py-2 rounded-full bg-[#bfa76a] text-[#2d1a09] text-sm font-medium shadow hover:bg-[#f5e9c8] transition w-full xs:w-auto"
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