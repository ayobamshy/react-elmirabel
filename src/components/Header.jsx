import { Link, NavLink } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Catalog', to: '/catalog' },
  { name: 'Events', to: '/events' },
  { name: 'Contact', to: '/contact' },
];

export default function Header() {
  const { user, loginGoogle, loginFacebook, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const adminDropdownTimeout = useRef();
  const [adminDropdownMobile, setAdminDropdownMobile] = useState(false);
  return (
    <header className="w-full bg-gradient-to-r from-[#2d1a09] via-[#4b320d] to-[#bfa76a] shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-3xl font-extrabold tracking-widest text-[#f5e9c8] font-serif drop-shadow-lg">El-Mirabel</span>
          <span className="hidden md:inline text-lg text-[#bfa76a] font-serif font-light">Wine Shop</span>
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#bfa76a] text-[#2d1a09] shadow-lg ml-2 focus:outline-none"
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
        {/* Navigation */}
        {/* Desktop nav: Admin dropdown for admins */}
        <nav className="hidden md:flex gap-2 md:gap-6">
          {[...navLinks, ...(user ? [{ name: 'Orders', to: '/orders' }] : [])].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium text-base transition-all duration-200 tracking-wide ` +
                (isActive
                  ? 'bg-[#bfa76a] text-[#2d1a09] shadow-lg'
                  : 'text-[#f5e9c8] hover:bg-[#bfa76a]/20 hover:text-[#bfa76a]')
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          {isAdmin && (
            <div className="relative"
              onMouseEnter={() => {
                clearTimeout(adminDropdownTimeout.current);
                setAdminDropdownOpen(true);
              }}
              onMouseLeave={() => {
                adminDropdownTimeout.current = setTimeout(() => setAdminDropdownOpen(false), 200);
              }}
            >
              <button className="px-4 py-2 rounded-full font-medium text-base transition-all duration-200 tracking-wide text-[#f5e9c8] hover:bg-[#bfa76a]/20 hover:text-[#bfa76a] flex items-center gap-1">
                Admin
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {adminDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#bfa76a]/30 z-50"
                  onMouseEnter={() => {
                    clearTimeout(adminDropdownTimeout.current);
                    setAdminDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    adminDropdownTimeout.current = setTimeout(() => setAdminDropdownOpen(false), 200);
                  }}
                >
                  <NavLink to="/admin/products" className={({ isActive }) => `block px-4 py-2 text-[#2d1a09] hover:bg-[#f5e9c8] rounded-t-xl ${isActive ? 'bg-[#bfa76a]/20' : ''}`}>Products</NavLink>
                  <NavLink to="/admin/events" className={({ isActive }) => `block px-4 py-2 text-[#2d1a09] hover:bg-[#f5e9c8] ${isActive ? 'bg-[#bfa76a]/20' : ''}`}>Events</NavLink>
                  <NavLink to="/admin/orders" className={({ isActive }) => `block px-4 py-2 text-[#2d1a09] hover:bg-[#f5e9c8] rounded-b-xl ${isActive ? 'bg-[#bfa76a]/20' : ''}`}>Orders</NavLink>
                </div>
              )}
            </div>
          )}
        </nav>
        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative group">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#bfa76a] text-[#2d1a09] shadow-lg hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7" />
              </svg>
            </span>
            {/* Cart count badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-md">{cartCount}</span>
            )}
          </Link>
          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL && <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full border-2 border-[#bfa76a]" />}
              <span className="text-[#f5e9c8] font-semibold text-sm">{user.displayName || user.email}</span>
              <button onClick={logout} className="px-3 py-1 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold shadow hover:bg-[#f5e9c8] transition-all ml-2">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={loginGoogle} className="px-3 py-1 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold shadow hover:bg-[#f5e9c8] transition-all">Login with Google</button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#2d1a09] bg-opacity-95 px-4 pb-4 pt-2 shadow-lg animate-fade-in-down">
          {/* Mobile nav: Admin dropdown for admins */}
          <nav className="flex flex-col gap-2 mb-4">
            {[...navLinks, ...(user ? [{ name: 'Orders', to: '/orders' }] : [])].map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-full font-medium text-base transition-all duration-200 tracking-wide ` +
                  (isActive
                    ? 'bg-[#bfa76a] text-[#2d1a09] shadow-lg'
                    : 'text-[#f5e9c8] hover:bg-[#bfa76a]/20 hover:text-[#bfa76a]')
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            {isAdmin && (
              <div className="relative">
                <button className="block w-full text-left px-4 py-2 rounded-full font-medium text-base transition-all duration-200 tracking-wide text-[#f5e9c8] hover:bg-[#bfa76a]/20 hover:text-[#bfa76a]" onClick={() => setAdminDropdownMobile(m => !m)}>
                  Admin ▼
                </button>
                {adminDropdownMobile && (
                  <div className="ml-4 mt-1 bg-white rounded-xl shadow-lg border border-[#bfa76a]/30 z-50">
                    <NavLink to="/admin/products" className={({ isActive }) => `block px-4 py-2 text-[#2d1a09] hover:bg-[#f5e9c8] rounded-t-xl ${isActive ? 'bg-[#bfa76a]/20' : ''}`} onClick={() => setMenuOpen(false)}>Products</NavLink>
                    <NavLink to="/admin/events" className={({ isActive }) => `block px-4 py-2 text-[#2d1a09] hover:bg-[#f5e9c8] ${isActive ? 'bg-[#bfa76a]/20' : ''}`} onClick={() => setMenuOpen(false)}>Events</NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => `block px-4 py-2 text-[#2d1a09] hover:bg-[#f5e9c8] rounded-b-xl ${isActive ? 'bg-[#bfa76a]/20' : ''}`} onClick={() => setMenuOpen(false)}>Orders</NavLink>
                  </div>
                )}
              </div>
            )}
          </nav>
          <div className="flex flex-col gap-2 items-start">
            <Link to="/cart" className="relative group w-full" onClick={() => setMenuOpen(false)}>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#bfa76a] text-[#2d1a09] shadow-lg hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7" />
                </svg>
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-md">{cartCount}</span>
              )}
              <span className="ml-3 text-[#f5e9c8] font-semibold">Cart</span>
            </Link>
            {user ? (
              <div className="flex items-center gap-2 mt-2">
                {user.photoURL && <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full border-2 border-[#bfa76a]" />}
                <span className="text-[#f5e9c8] font-semibold text-sm">{user.displayName || user.email}</span>
                <button onClick={() => { setMenuOpen(false); logout(); }} className="px-3 py-1 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold shadow hover:bg-[#f5e9c8] transition-all ml-2">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2 w-full">
                <button onClick={() => { setMenuOpen(false); loginGoogle(); }} className="px-3 py-1 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold shadow hover:bg-[#f5e9c8] transition-all w-full">Login with Google</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
