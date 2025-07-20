import { useCart } from '../components/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#bfa76a] mb-8 text-center font-serif tracking-widest drop-shadow">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p>Your cart is empty.</p>
          <Link to="/catalog" className="text-[#bfa76a] underline mt-4 inline-block">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-[#bfa76a]/30">
            <table className="w-full min-w-[600px] text-center border-collapse text-sm sm:text-base">
              <thead className="bg-[#bfa76a]/80 text-[#2d1a09]">
                <tr>
                  <th></th>
                  <th colSpan={2}>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="border-b border-[#bfa76a]/20">
                    <td>
                      <button
                        className="text-red-500 hover:text-red-700 text-lg rounded-full bg-red-50 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-300"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        &#128465;
                      </button>
                    </td>
                    <td>
                      <img src={item.image} alt={item.name} className="h-16 w-12 sm:h-20 sm:w-16 object-cover rounded-xl bg-[#f5e9c8]" />
                    </td>
                    <td className="capitalize font-semibold text-[#2d1a09]">{item.name}</td>
                    <td className="text-[#bfa76a] font-bold">₦{item.price.toLocaleString()}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.qty || 1}
                        onChange={e => updateQty(item.id, Number(e.target.value))}
                        className="w-14 sm:w-16 p-1 border rounded text-center border-[#bfa76a]/40 focus:outline-none focus:ring-2 focus:ring-[#bfa76a]/40"
                        aria-label={`Quantity for ${item.name}`}
                      />
                    </td>
                    <td className="text-[#bfa76a] font-bold">₦{(item.price * (item.qty || 1)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="text-xl sm:text-2xl font-bold text-[#bfa76a]">Total: ₦{total.toLocaleString()}</div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                className="px-6 py-2 bg-[#f5e9c8] text-[#2d1a09] rounded-lg hover:bg-[#bfa76a]/80 transition-colors text-base sm:text-lg font-semibold shadow w-full sm:w-auto"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="px-6 py-2 bg-[#bfa76a] text-[#2d1a09] rounded-lg hover:bg-[#f5e9c8] transition-colors text-base sm:text-lg font-semibold shadow w-full sm:w-auto"
                onClick={() => navigate('/checkout')}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
