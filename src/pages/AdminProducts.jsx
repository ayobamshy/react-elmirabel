import { useAuth } from '../components/AuthContext';
import { useProducts, addProduct, updateProduct, deleteProduct } from '../components/ProductsContext';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminProducts() {
  const { user, isAdmin, authLoading } = useAuth();
  const { products, refreshProducts } = useProducts();
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', featured: false });
  const [editingProductId, setEditingProductId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user !== undefined && isAdmin !== undefined) {
      // setAuthLoading(false); // This line is removed as per the edit hint
    }
  }, [user, isAdmin]);

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [authLoading, user, isAdmin]);

  if (authLoading) return <div className="text-center py-20 text-[#bfa76a]">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/" />;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const maxFeatured = 3;
  const featuredCount = products.filter(p => !!p.featured).length;

  const handleAdd = async e => {
    e.preventDefault();
    setMessage(null); setError(null);
    // Prevent adding or editing to featured if already 3 featured wines
    if (form.featured && (editingProductId ? featuredCount === maxFeatured && !products.find(p => p.id === editingProductId)?.featured : featuredCount >= maxFeatured)) {
      setError('You can only have 3 featured wines. Unfeature another wine first.');
      return;
    }
    try {
      if (editingProductId) {
        const updatePayload = {
          ...form,
          price: Number(form.price),
          featured: Boolean(form.featured)
        };
        const { data, error } = await updateProduct(editingProductId, updatePayload, refreshProducts);
        if (!error && data && data.length > 0) {
          setMessage('Product updated successfully!');
          setEditingProductId(null);
          setForm({ name: '', description: '', price: '', image: '', featured: false });
        } else {
          setError('Failed to update product.');
        }
      } else {
        const addPayload = {
          ...form,
          price: Number(form.price),
          featured: Boolean(form.featured)
        };
        const { data, error } = await addProduct(addPayload, refreshProducts);
        if (!error && data && data.length > 0) {
          setMessage('Product added successfully!');
          setForm({ name: '', description: '', price: '', image: '', featured: false });
        } else {
          setError('Failed to add product.');
        }
      }
    } catch (err) {
      setError('Failed to save product.');
    }
  };

  const handleEdit = product => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      featured: !!product.featured
    });
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setForm({ name: '', description: '', price: '', image: '', featured: false });
    setEditingProductId(null);
  };

  const handleDelete = async id => {
    await deleteProduct(id, refreshProducts);
    if (editingProductId === id) handleCancel();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">Admin: Products</h1>
      {message && <div className="mb-4 text-green-700 bg-green-100 border border-green-300 rounded p-2 text-center">{message}</div>}
      {error && <div className="mb-4 text-red-700 bg-red-100 border border-red-300 rounded p-2 text-center">{error}</div>}
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row flex-wrap gap-4 mb-8 bg-[#f5e9c8] p-4 rounded-xl">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="flex-1 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="flex-1 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required className="w-32 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required className="w-48 min-w-0 max-w-full px-3 py-2 rounded border border-[#bfa76a]/30" />
        <label className="flex items-center gap-1 text-[#bfa76a] font-semibold whitespace-nowrap">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured
        </label>
        <button type="submit" className="px-4 py-2 rounded bg-[#bfa76a] text-[#2d1a09] font-bold shadow hover:bg-[#f5e9c8]">{editingProductId ? 'Save' : 'Add'}</button>
        {editingProductId && <button type="button" onClick={handleCancel} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-bold shadow hover:bg-gray-300">Cancel</button>}
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
            <button onClick={() => handleEdit(p)} className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-bold hover:bg-blue-200">Edit</button>
            <button onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded bg-red-100 text-red-700 font-bold hover:bg-red-200">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 