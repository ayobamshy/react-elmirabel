import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../components/ProductsContext';

export default function Catalog() {
  const { products } = useProducts();
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bfa76a] mb-8 sm:mb-10 text-center font-serif tracking-widest drop-shadow">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
