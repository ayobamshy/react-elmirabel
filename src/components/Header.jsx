import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from './CartContext';

const navLinks = [
  { name: 'Wines', to: '/catalog' },
  { name: 'Estates & Brands', to: '/brands' },
  { name: 'Discover', to: '/discover' },
  { name: 'Special Offers', to: '/offers' },
  { name: 'Events', to: '/events' },
  { name: 'Wine Gifts', to: '/gifts' },
];

export default function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-[#7c2d12] via-[#a16207] to-[#7c2d12] text-white text-sm py-3 px-6 text-center font-medium shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Discover Great Wines & Free Shipping On Orders Over ₦100,000*</span>
        </div>
      </div>
      
      {/* Logo/Search/Cart Row */}
      <div className="w-full bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb] py-6 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="relative"
            >
              <img
                src="/images/index/logo3.jpeg"
                alt="El-Mirabel Logo"
                className="h-14 w-14 rounded-full shadow-lg object-cover border-2 border-white/60 group-hover:border-[#a16207]/40 transition-colors"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7c2d12]/20 to-[#a16207]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
            <span className="font-extrabold text-3xl tracking-tight text-[#7c2d12] group-hover:text-[#a16207] transition-colors">
              El-Mirabel
            </span>
          </Link>
          
          {/* Search Bar */}
          <div className="flex-1 flex justify-center max-w-2xl w-full">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#7c2d12]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search wines, brands, events..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-[#a16207] focus:border-transparent text-base shadow-sm bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            </div>
          </div>
          
          {/* Icons */}
          <div className="flex items-center gap-6">
            {/* Location */}
            <button className="text-[#7c2d12] hover:text-[#a16207] transition-colors p-2 rounded-full hover:bg-[#a16207]/10" title="Location">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            {/* Account */}
            <button className="text-[#7c2d12] hover:text-[#a16207] transition-colors p-2 rounded-full hover:bg-[#a16207]/10" title="Account">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
              </svg>
            </button>
            
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#7c2d12] to-[#a16207] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75V6.75A3.75 3.75 0 0012.75 3h-1.5A3.75 3.75 0 007.5 6.75v7.5z"
                  />
                </svg>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#a16207] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="w-full bg-white/98 backdrop-blur-sm border-b border-[#e5e7eb] shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex gap-1 md:gap-2 lg:gap-6 px-6 py-3 justify-center overflow-x-auto">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium text-sm md:text-base px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7c2d12] to-[#a16207] text-white shadow-md'
                    : 'text-[#7c2d12] hover:bg-[#a16207]/10 hover:text-[#a16207]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
