import products from '../data/catalog';
import { Link } from 'react-router-dom';

export default function Catalog({ featuredOnly = false }) {
  let displayProducts = products;
  // If products have a 'featured' field, filter by it. Otherwise, just take first 6.
  if (featuredOnly) {
    if (products.some(p => p.featured)) {
      displayProducts = products.filter(p => p.featured).slice(0, 6);
    } else {
      displayProducts = products.slice(0, 6);
    }
  }

  if (!displayProducts.length) {
    return <div className="text-center text-[#7c2d12] py-12">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 py-8">
      {displayProducts.map(product => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          className="group bg-white rounded-2xl shadow-lg border border-[#e5e7eb] flex flex-col overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="aspect-w-1 aspect-h-1 w-full flex items-center justify-center overflow-hidden bg-[#f9f6f2]">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full max-w-[220px] max-h-[220px] rounded-2xl mx-auto group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-lg text-[#7c2d12] mb-1 group-hover:text-[#a16207] transition-colors">
              {product.name}
            </h3>
            <p className="text-[#7c2d12]/70 text-sm mb-2 flex-1">{product.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold text-[#a16207] text-lg">₦{product.price.toLocaleString()}</span>
              <button className="px-4 py-1 rounded-full bg-[#7c2d12] text-white text-sm font-medium shadow hover:bg-[#a16207] transition">View</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
