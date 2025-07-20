import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { supabase } from '../supabaseClient';
import { Navigate } from 'react-router-dom';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.uid || user?.email)
        .order('created_at', { ascending: false });
      if (!error) setOrders(data || []);
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">My Orders</h1>
      {loading ? (
        <div className="text-center text-[#bfa76a]">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">You have no orders yet.</div>
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
    </div>
  );
} 