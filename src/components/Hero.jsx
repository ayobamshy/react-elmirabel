import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[60vh] md:min-h-[70vh] bg-[#fff7ed] overflow-hidden">
      {/* Background Image Overlay */}
      <img
        src="/images/index/wine-rack.jpeg"
        alt="Wine bottles background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        style={{ filter: 'blur(2px)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff7ed]/80 via-[#7c2d12]/20 to-[#fff7ed]/90 z-10" />
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 max-w-3xl w-full mx-4 md:mx-auto rounded-3xl p-8 md:p-14 flex flex-col items-center text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-[#7c2d12] drop-shadow-lg mb-4"
        >
          Discover Premium Wines & Unforgettable Moments
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg md:text-2xl text-[#a16207] font-medium mb-8"
        >
          Experience the finest selection of wines from around the world in an atmosphere of elegance and sophistication.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/catalog"
            className="inline-block px-8 py-3 rounded-full bg-[#7c2d12] text-white font-bold text-lg shadow-lg hover:bg-[#a16207] transition-colors duration-200"
          >
            Shop Wines
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 