import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext.jsx";

function Cart() {
  const { cart, removeFromCart, clearCart, updateQty } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  return (
    <section className="min-h-[70vh] bg-blue-50 py-10 px-2">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>Your cart is empty.</p>
            <Link to="/" className="text-blue-600 underline mt-4 inline-block">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead className="bg-violet-600 text-white">
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
                    <tr key={item.id} className="border-b">
                      <td>
                        <button
                          className="text-red-500 hover:text-red-700 text-lg"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          &#128465;
                        </button>
                      </td>
                      <td>
                        <img src={item.image} alt={item.name} className="h-20 w-14 object-cover rounded" />
                      </td>
                      <td className="capitalize font-semibold">{item.name}</td>
                      <td>NGN {item.price.toLocaleString()}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.qty || 1}
                          onChange={e => updateQty(item.id, Number(e.target.value))}
                          className="w-16 p-1 border rounded text-center"
                          aria-label={`Quantity for ${item.name}`}
                        />
                      </td>
                      <td>NGN {(item.price * (item.qty || 1)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-footer mt-8 flex flex-col items-center">
              <div className="text-xl font-bold mb-4">Total: NGN {total.toLocaleString()}</div>
              <div className="flex gap-4">
                <button
                  className="px-6 py-2 bg-yellow-100 text-gray-900 rounded-lg hover:bg-yellow-200 transition-colors text-lg"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="px-6 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors text-lg"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
