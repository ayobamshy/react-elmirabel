import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../components/ProductsContext';

export default function Catalog() {
  const { products } = useProducts();
  const productRefs = useRef({});
  const location = useLocation();

  // Bulletproof scroll-to-product with highlight
  const scrollToProductWithRetry = useCallback((hash, maxAttempts = 30, delay = 80) => {
    let attempts = 0;
    function tryScroll() {
      if (hash && hash.startsWith('#product-')) {
        const id = hash.replace('#product-', '');
        const el = productRefs.current[id];
        if (el) {
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight effect
            el.classList.add('ring-4', 'ring-[#bfa76a]', 'transition');
            setTimeout(() => {
              el.classList.remove('ring-4', 'ring-[#bfa76a]', 'transition');
            }, 1200);
          });
          return;
        }
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, delay);
      }
    }
    tryScroll();
  }, []);

  useEffect(() => {
    scrollToProductWithRetry(location.hash);
  }, [products, location.hash, scrollToProductWithRetry]);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bfa76a] mb-8 sm:mb-10 text-center font-serif tracking-widest drop-shadow">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {products.map(product => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            ref={el => (productRefs.current[product.id] = el)}
            className="h-full flex flex-col"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
