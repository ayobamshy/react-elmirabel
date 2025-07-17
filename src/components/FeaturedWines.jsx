import catalog from '../data/catalog';

const featured = catalog.slice(0, 6); // Show 6 featured wines

export default function FeaturedWines() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#fff7ed]/60 to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#7c2d12] mb-10 text-center drop-shadow-sm">
          Featured Wines
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featured.map(wine => (
            <div
              key={wine.id}
              className="bg-white/80 rounded-2xl shadow-lg border border-white/30 p-4 flex flex-col items-center hover:shadow-2xl transition-shadow duration-200 group"
            >
              <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden rounded-xl bg-white mb-4">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="object-contain h-48 w-full group-hover:scale-105 transition-transform duration-200"
                  style={{ maxHeight: '12rem' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-[#7c2d12] mb-1 text-center truncate w-full">{wine.name}</h3>
              <p className="text-[#a16207] font-bold text-base mb-2">₦{wine.price.toLocaleString()}</p>
              <button className="mt-auto px-4 py-2 bg-[#7c2d12] text-white rounded-full font-semibold text-sm hover:bg-[#a16207] transition-colors w-full">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 