import { useAuth } from '../components/AuthContext';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', featured: false });
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', image: '', description: '' });

  useEffect(() => {
    import('../data/products.json').then(mod => setProducts(mod.default || mod));
    import('../data/events.json').then(mod => setEvents(mod.default || mod));
  }, []);

  if (!user) return <Navigate to="/" />;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleEventChange = e => {
    const { name, value } = e.target;
    setEventForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = e => {
    e.preventDefault();
    setProducts(prev => [
      ...prev,
      { ...form, id: Date.now(), price: Number(form.price) }
    ]);
    setForm({ name: '', description: '', price: '', image: '', featured: false });
  };
  const handleEventAdd = e => {
    e.preventDefault();
    setEvents(prev => [
      ...prev,
      { ...eventForm, id: Date.now() }
    ]);
    setEventForm({ title: '', date: '', time: '', image: '', description: '' });
  };

  const handleDelete = id => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };
  const handleEventDelete = id => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">Admin Panel</h1>
      <h2 className="text-2xl font-bold text-[#2d1a09] mb-4">Products</h2>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 mb-8 bg-[#f5e9c8] p-4 rounded-xl">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="flex-1 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="flex-1 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required className="w-32 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required className="w-48 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <label className="flex items-center gap-1 text-[#bfa76a] font-semibold">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured
        </label>
        <button type="submit" className="px-4 py-2 rounded bg-[#bfa76a] text-[#2d1a09] font-bold shadow hover:bg-[#f5e9c8]">Add</button>
      </form>
      <ul className="divide-y divide-[#bfa76a]/30 bg-white rounded-xl shadow">
        {products.map(p => (
          <li key={p.id} className="flex items-center gap-4 py-4 px-4">
            <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl border border-[#bfa76a]/30" />
            <div className="flex-1">
              <div className="font-bold text-[#2d1a09]">{p.name}</div>
              <div className="text-sm text-[#4b320d]/80">{p.description}</div>
              <div className="text-[#bfa76a] font-semibold">₦{p.price.toLocaleString()}</div>
              {p.featured && <span className="text-xs text-[#bfa76a] font-bold ml-2">Featured</span>}
            </div>
            <button onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded bg-red-100 text-red-700 font-bold hover:bg-red-200">Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold text-[#2d1a09] mt-10 mb-4">Events</h2>
      <form onSubmit={handleEventAdd} className="flex flex-col md:flex-row gap-4 mb-8 bg-[#f5e9c8] p-4 rounded-xl">
        <input name="title" value={eventForm.title} onChange={handleEventChange} placeholder="Title" required className="flex-1 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="date" value={eventForm.date} onChange={handleEventChange} placeholder="Date" required className="w-32 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="time" value={eventForm.time} onChange={handleEventChange} placeholder="Time" required className="w-32 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="image" value={eventForm.image} onChange={handleEventChange} placeholder="Image URL" required className="w-48 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="description" value={eventForm.description} onChange={handleEventChange} placeholder="Description" required className="flex-1 px-3 py-2 rounded border border-[#bfa76a]/30" />
        <button type="submit" className="px-4 py-2 rounded bg-[#bfa76a] text-[#2d1a09] font-bold shadow hover:bg-[#f5e9c8]">Add</button>
      </form>
      <ul className="divide-y divide-[#bfa76a]/30 bg-white rounded-xl shadow">
        {events.map(ev => (
          <li key={ev.id} className="flex items-center gap-4 py-4 px-4">
            <img src={ev.image} alt={ev.title} className="w-16 h-16 object-cover rounded-xl border border-[#bfa76a]/30" />
            <div className="flex-1">
              <div className="font-bold text-[#2d1a09]">{ev.title}</div>
              <div className="text-sm text-[#4b320d]/80">{ev.description}</div>
              <div className="text-[#bfa76a] font-semibold">{ev.date} {ev.time}</div>
            </div>
            <button onClick={() => handleEventDelete(ev.id)} className="px-3 py-1 rounded bg-red-100 text-red-700 font-bold hover:bg-red-200">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 