
import Header from './components/Header';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Events from './components/Events';
import Product from './components/Product';
import HomePage from './components/HomePage';
import { CartProvider } from './components/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <main className="min-h-screen bg-[#f9f6f2]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/events" element={<Events />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<div className='text-center py-20 text-2xl text-[#a16207]'>404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}
