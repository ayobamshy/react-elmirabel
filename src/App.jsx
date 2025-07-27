import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Orders from './pages/Orders';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminEvents from './pages/AdminEvents';
import { CartProvider, useCart } from './components/CartContext';
import { AuthProvider, useAuth } from './components/AuthContext';
import { ProductsProvider } from './components/ProductsContext';
import { EventsProvider } from './components/EventsContext';
import CartSupabaseSync from './components/CartSupabaseSync';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []); // fire on mount (refresh)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]); // fire on route change
  return null;
}

// Cart persistence logic moved here
function CartPersistence() {
  const { user } = useAuth();
  const { cart, clearCart, saveCartForUser, loadCartForUser, setCart } = useCart();
  
  // Load user-specific cart when user logs in
  useEffect(() => {
    if (user) {
      loadCartForUser(user.email || user.uid);
    }
    // eslint-disable-next-line
  }, [user]);
  
  // Save cart before unmounting (e.g., on logout)
  useEffect(() => {
    const saveCartBeforeUnload = () => {
      if (user) {
        saveCartForUser(user.email || user.uid);
      }
    };
    
    // Save cart when page is unloaded
    window.addEventListener('beforeunload', saveCartBeforeUnload);
    
    // Cleanup function - save cart when component unmounts
    return () => {
      saveCartBeforeUnload();
      window.removeEventListener('beforeunload', saveCartBeforeUnload);
    };
  }, [user, cart]);
  
  return null;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
    <EventsProvider>
          <Router>
            <CartSupabaseSync />
            <CartPersistence />
            <ScrollToTop />
            <Header />
            <main className="min-h-screen bg-neutral-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/events" element={<AdminEvents />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<div className='text-center py-20 text-2xl text-gray-400'>404 - Page Not Found</div>} />
              </Routes>
            </main>
            <Footer />
          </Router>
            </EventsProvider>
</ProductsProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
