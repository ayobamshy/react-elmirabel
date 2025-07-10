import React, { useState } from "react";
import catalog from "../data/catalog";
import { useCart } from "./CartContext.jsx";
import { Link } from "react-router-dom";

const priceOptions = [
  { value: "all", label: "All Prices" },
  { value: "0-70000", label: "Below NGN 70,000" },
  { value: "70000-80000", label: "NGN 70,000 - 80,000" },
  { value: "80000-90000", label: "NGN 80,000 - 90,000" },
  { value: "90000+", label: "Above NGN 90,000" },
];

function Catalog() {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("all");
  const { addToCart } = useCart();

  const filteredCatalog = catalog.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    let matchesPrice = true;
    if (price !== "all") {
      if (price === "90000+") {
        matchesPrice = product.price > 90000;
      } else {
        const [min, max] = price.split("-").map(Number);
        matchesPrice = product.price >= min && product.price < max;
      }
    }
    return matchesSearch && matchesPrice;
  });

  return (
    <section className="py-8 px-4 bg-blue-50 min-h-screen">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
        <input
          type="text"
          className="p-2 rounded border border-gray-300 min-w-[200px] text-lg"
          placeholder="Search wines by name..."
          aria-label="Search wines by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded border border-gray-300 text-lg"
          aria-label="Filter by price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        >
          {priceOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCatalog.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No products found. Try a different search or filter.</div>
        ) : (
          filteredCatalog.map(product => (
            <div
              key={product.id}
              className="product-item bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-4 animate-fadeInUp"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full max-w-[470px] max-h-[350px] object-cover rounded-lg mb-4"
                />
              </Link>
              <p className="font-semibold text-lg mb-1">{product.name}</p>
              <p className="text-gray-700 mb-2">NGN {product.price.toLocaleString()}</p>
              <button
                className="mt-auto px-4 py-2 bg-yellow-100 text-gray-900 rounded-lg hover:bg-yellow-200 transition-colors"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Catalog;
