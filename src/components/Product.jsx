import { useParams } from 'react-router-dom';
import products from '../data/catalog';
import { useCart } from './CartContext';

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => String(p.id) === String(id));
  const { addToCart } = useCart();

  if (!product) {
    return <div className="max-w-2xl mx-auto py-24 text-center text-[#7c2d12] text-2xl font-bold">Product not found.</div>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12 bg-white/90 rounded-3xl shadow-xl border border-[#e5e7eb] overflow-hidden">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center bg-[#f9f6f2] p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-[350px] max-h-[350px] object-cover rounded-2xl shadow-lg border-2 border-white/60 mx-auto"
          />
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-6 p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#7c2d12] mb-2">{product.name}</h1>
          <span className="text-[#a16207] text-2xl font-bold mb-2">₦{product.price.toLocaleString()}</span>
          <p className="text-[#7c2d12]/80 text-lg mb-4">{product.description}</p>
          <button
            className="px-8 py-3 rounded-full bg-[#7c2d12] text-white font-semibold text-lg shadow hover:bg-[#a16207] transition w-fit"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <div className="mt-8 text-[#7c2d12]/80 text-base bg-[#a16207]/10 rounded-lg px-4 py-3">
            <span className="font-semibold">Shipping:</span> Free on orders over ₦100,000. Same-day Lagos delivery available.
          </div>
        </div>
      </div>
    </main>
  );
}
