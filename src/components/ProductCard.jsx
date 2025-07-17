import { useCart } from './CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 flex flex-col overflow-hidden hover:shadow-2xl transition-transform hover:-translate-y-1">
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
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-[#bfa76a] text-lg">₦{product.price.toLocaleString()}</span>
          <button
            className="px-4 py-1 rounded-full bg-[#bfa76a] text-[#2d1a09] text-sm font-medium shadow hover:bg-[#f5e9c8] transition"
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 