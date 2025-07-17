import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-white via-[#f9f6f2] to-white border-t-2 border-[#a16207]/20 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/index/logo3.jpeg"
                alt="El-Mirabel Logo"
                className="max-w-[60px] max-h-[60px] rounded-2xl shadow-lg object-cover border-2 border-white/60"
              />
              <span className="font-extrabold text-2xl tracking-tight text-[#7c2d12]">
                El-Mirabel
              </span>
            </div>
            <h4 className="text-xl font-bold text-[#7c2d12] mb-3">About El-Mirabel</h4>
            <p className="text-[#7c2d12]/80 text-base leading-relaxed">
              Nigeria's premier wine destination. Curated selection, expert advice, and exclusive events for every wine lover. 
              We bring the world's finest wines to your doorstep.
            </p>
            <div className="flex items-center gap-4 text-sm text-[#7c2d12]/60">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#a16207]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Premium Selection</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#7c2d12] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/catalog" className="text-[#7c2d12]/80 hover:text-[#a16207] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#a16207] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Shop Wines
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-[#7c2d12]/80 hover:text-[#a16207] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#a16207] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-[#7c2d12]/80 hover:text-[#a16207] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#a16207] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Book Event
                </Link>
              </li>
              <li>
                <Link to="/gifts" className="text-[#7c2d12]/80 hover:text-[#a16207] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-[#a16207] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Wine Gifts
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#7c2d12] mb-4">Contact</h4>
            <div className="space-y-3 text-[#7c2d12]/80">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#a16207]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#a16207]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@elmirabel.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#a16207]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+234 800 123 4567</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-[#7c2d12] mb-3">Follow Us</h5>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#7c2d12] to-[#a16207] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {social.icon === 'instagram' && (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      )}
                      {social.icon === 'facebook' && (
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      )}
                      {social.icon === 'twitter' && (
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      )}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="w-full text-center text-[#7c2d12]/60 text-sm py-6 border-t border-[#e5e7eb] bg-white/95">
        <div className="max-w-4xl mx-auto px-6">
          <p>
            &copy; {new Date().getFullYear()} El-Mirabel. All rights reserved. 
            Site by <a href="https://github.com/ayoisaiah" className="underline hover:text-[#a16207] transition-colors">ayoisaiah</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
