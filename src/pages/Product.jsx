import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    import('../data/products.json').then(mod => {
      const found = (mod.default || mod).find(p => String(p.id) === String(id));
      setProduct(found || null);
    });
  }, [id]);

  if (product === undefined) return null;
  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#bfa76a] mb-4">Product Not Found</h1>
        <Link to="/catalog" className="text-[#bfa76a] underline">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10 items-center">
      <div className="flex-1 flex justify-center">
        <img src={product.image} alt={product.name} className="rounded-2xl shadow-xl border-4 border-[#bfa76a]/30 w-full max-w-[350px] max-h-[400px] object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-[#bfa76a] font-serif tracking-widest drop-shadow mb-2">{product.name}</h1>
        <p className="text-lg text-[#2d1a09]/90 mb-4">{product.description}</p>
        <div className="text-2xl font-bold text-[#bfa76a] mb-6">₦{product.price.toLocaleString()}</div>
        <button
          className="px-8 py-3 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold text-lg shadow hover:bg-[#f5e9c8] transition w-fit"
          onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </button>
        <Link to="/catalog" className="text-[#bfa76a] underline mt-4">Back to Catalog</Link>
      </div>
    </div>
  );
}
