import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

const featuredWines = products.filter(p => p.featured).map((p, i) => ({
  ...p,
  image: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1514361892635-cebbd82b8bdf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'
  ][i] || p.image
}));

const testimonials = [
  {
    quote: 'The best wine experience in the city. Every bottle is a journey!',
    name: '— Ada O.'
  },
  {
    quote: 'Elegant ambiance, world-class selection, and warm hospitality.',
    name: '— Chinedu A.'
  },
  {
    quote: 'A true gem for wine lovers. Highly recommended!',
    name: '— Ifeanyi E.'
  }
];

export default function Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    import('../data/events.json').then(mod => setEvents(mod.default || mod));
  }, []);

  const upcoming = events.slice(0, 2);

  return (
    <div className="bg-[#f8f5ef]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-black/60">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Luxury Wine" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="relative z-10 max-w-2xl mx-auto p-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#bfa76a] drop-shadow-lg mb-4">El Mirabel Wine Lounge</h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-light">Experience the Art of Fine Wine &amp; Luxury Living</p>
          <a href="/catalog" className="inline-block px-8 py-3 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold text-lg shadow-lg hover:bg-[#e5d7b3] transition">Shop Now</a>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#2d1a09] mb-4">Welcome to El Mirabel</h2>
        <p className="text-lg text-[#4b320d] mb-2">Where every bottle tells a story and every visit is a celebration. Discover a curated selection of the world’s finest wines, handpicked for the discerning palate. Whether you’re a connoisseur or a curious newcomer, our lounge offers an unforgettable journey through taste, elegance, and hospitality.</p>
      </section>

      {/* Featured Wines */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-serif font-bold text-[#bfa76a] mb-8 text-center">Featured Wines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredWines.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Events Teaser */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-serif font-bold text-[#bfa76a] mb-8 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcoming.map((event, i) => (
            <a
              key={event.id}
              href="/events"
              className="block group focus:outline-none focus:ring-2 focus:ring-[#bfa76a]/70 rounded-2xl transition-shadow hover:shadow-2xl"
              aria-label={`See details for ${event.title} on the Events page`}
            >
              <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-[#bfa76a]/20 group-hover:border-[#bfa76a]/40 transition">
                <img src={event.image} alt={event.title} className="w-full md:w-1/3 h-48 object-cover" />
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-[#2d1a09] mb-2">{event.title}</h3>
                  <p className="text-[#bfa76a] font-medium mb-1">{event.date} {event.time}</p>
                  <p className="text-[#4b320d] text-sm mb-2">{event.description}</p>
                  <span className="text-[#bfa76a] underline font-semibold text-sm group-hover:text-[#2d1a09]">See All Events</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#bfa76a] mb-8">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 border border-[#bfa76a]/10">
              <p className="italic text-lg text-[#2d1a09] mb-4">“{t.quote}”</p>
              <span className="block text-[#bfa76a] font-semibold">{t.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
