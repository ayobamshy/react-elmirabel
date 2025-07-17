import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-t from-[#fff7ed]/60 to-transparent">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
        <motion.img
          src="/images/index/wine-rack.jpeg"
          alt="Wine rack at El-Mirabel"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 rounded-3xl shadow-2xl border border-white/30 object-cover"
        />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#7c2d12] mb-4 drop-shadow-sm">Our Story</h2>
          <p className="text-lg md:text-xl text-[#a16207] font-medium mb-4">
            El-Mirabel Bar & Lounge is dedicated to curating unforgettable experiences through the world of wine. Our passion for excellence is reflected in every bottle, every event, and every guest we serve.
          </p>
          <p className="text-gray-700 mb-4">
            From rare vintages to beloved classics, our collection is handpicked to delight both connoisseurs and casual enthusiasts. Whether you’re celebrating a special occasion or simply enjoying a quiet evening, El-Mirabel is your destination for elegance, sophistication, and community.
          </p>
          <p className="text-gray-700">
            Join us for exclusive tastings, vibrant events, and a warm, welcoming atmosphere. Discover the art of wine with us.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 