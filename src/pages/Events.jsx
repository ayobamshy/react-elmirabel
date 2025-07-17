import { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    import('../data/events.json').then(mod => setEvents(mod.default || mod));
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-[#bfa76a] mb-10 text-center font-serif tracking-widest drop-shadow">Upcoming Events</h1>
      {events.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No events at this time.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map(ev => (
            <div key={ev.id} className="bg-white rounded-2xl shadow-lg border border-[#bfa76a]/30 flex flex-col overflow-hidden hover:shadow-2xl transition-transform hover:-translate-y-1">
              <div className="aspect-w-1 aspect-h-1 w-full flex items-center justify-center overflow-hidden bg-[#f5e9c8]">
                <img src={ev.image} alt={ev.title} className="object-cover w-full h-full max-w-[220px] max-h-[220px] rounded-2xl mx-auto" loading="lazy" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#2d1a09] mb-1">{ev.title}</h3>
                <div className="text-[#bfa76a] font-semibold mb-2">{ev.date} {ev.time}</div>
                <p className="text-[#4b320d]/80 text-sm mb-2 flex-1">{ev.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
