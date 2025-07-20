import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
const SORT_FIELDS = [
  { label: 'Date', value: 'created_at' },
  { label: 'Total', value: 'total' },
  { label: 'Name', value: 'name' },
];

export default function AdminOrders() {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!user || !isAdmin) return;
    const fetchOrders = async () => {
      setLoading(true);
      let query = supabase.from('orders').select('*', { count: 'exact' });
      if (filter) {
        query = query.ilike('name', `%${filter}%`);
      }
      query = query.order(sortField, { ascending: sortDir === 'asc' });
      query = query.range((page - 1) * pageSize, page * pageSize - 1);
      const { data, error, count } = await query;
      if (!error) {
        setOrders(data || []);
        setTotalCount(count || 0);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user, isAdmin, filter, sortField, sortDir, page, pageSize]);

  if (!user || !isAdmin) return <Navigate to="/" />;

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">All Orders (Admin)</h1>
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={e => { setFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded border border-[#bfa76a]/30 text-sm"
        />
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-[#bfa76a]">Sort by:</label>
          <select value={sortField} onChange={e => setSortField(e.target.value)} className="px-2 py-1 rounded border border-[#bfa76a]/30 text-sm">
            {SORT_FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')} className="px-2 py-1 rounded bg-[#bfa76a] text-[#2d1a09] font-bold ml-2">{sortDir === 'asc' ? '↑' : '↓'}</button>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-semibold text-[#bfa76a]">Per page:</label>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="px-2 py-1 rounded border border-[#bfa76a]/30 text-sm">
            {PAGE_SIZE_OPTIONS.map(size => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-[#bfa76a]">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow border border-[#bfa76a]/30 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#bfa76a]">Order #{order.id}</span>
                <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</span>
              </div>
              <div className="mb-2 text-[#2d1a09]/80">
                <span className="font-semibold">Name:</span> {order.name}<br/>
                <span className="font-semibold">Email:</span> {order.email}<br/>
                <span className="font-semibold">Address:</span> {order.address}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-[#bfa76a]">Items:</span>
                <ul className="ml-4 list-disc">
                  {(order.items || []).map((item, idx) => (
                    <li key={idx} className="text-[#2d1a09]/90 text-sm">
                      {item.name} x {item.qty} — ₦{(item.price * (item.qty || 1)).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-bold text-[#bfa76a] text-base sm:text-lg mt-2">Total: ₦{order.total?.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-4 py-2 rounded bg-[#bfa76a] text-[#2d1a09] font-bold disabled:opacity-50">Prev</button>
        <span className="font-semibold text-[#bfa76a]">Page {page} of {totalPages || 1}</span>
        <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-4 py-2 rounded bg-[#bfa76a] text-[#2d1a09] font-bold disabled:opacity-50">Next</button>
      </div>
    </div>
  );
} 