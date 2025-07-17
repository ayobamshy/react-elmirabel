import { Link, NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Catalog', to: '/catalog' },
  { name: 'Events', to: '/events' },
  { name: 'Contact', to: '/contact' },
];

export default function Header() {
  const { user, loginGoogle, loginFacebook, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  return (
    <header className="w-full bg-gradient-to-r from-[#2d1a09] via-[#4b320d] to-[#bfa76a] shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-3xl font-extrabold tracking-widest text-[#f5e9c8] font-serif drop-shadow-lg">El-Mirabel</span>
          <span className="hidden md:inline text-lg text-[#bfa76a] font-serif font-light">Wine Shop</span>
        </Link>
        {/* Navigation */}
        <nav className="flex gap-2 md:gap-6">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium text-base transition-all duration-200 tracking-wide ` +
                (isActive
                  ? 'bg-[#bfa76a] text-[#2d1a09] shadow-lg'
                  : 'text-[#f5e9c8] hover:bg-[#bfa76a]/20 hover:text-[#bfa76a]')
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        {/* Actions */}
        <div className="flex items-center gap-4">
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
              <button onClick={loginFacebook} className="px-3 py-1 rounded-full bg-[#bfa76a] text-[#2d1a09] font-semibold shadow hover:bg-[#f5e9c8] transition-all">Login with Facebook</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
