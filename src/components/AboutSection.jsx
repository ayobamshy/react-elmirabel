import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">
              Welcome to El-Mirabel
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Nestled in the heart of the city, El-Mirabel Bar & Lounge is more than just a venue—it's an experience. 
              We curate the finest selection of premium wines from around the world, each bottle telling its own story.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're planning an intimate gathering or a grand celebration, our dedicated team ensures every 
              moment is memorable. From wine tastings to corporate events, we create the perfect atmosphere for any occasion.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">Premium Wines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Events</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/reservation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Book Your Event
                </motion.button>
              </Link>
              <Link to="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  View Events
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-4"
            >
              <img
                src="/images/index/bottle-cup.avif"
                alt="Wine Service"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/images/index/cart2.jpeg"
                alt="Wine Collection"
                className="w-full h-32 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-4 pt-8"
            >
              <img
                src="/images/index/cart3.png"
                alt="Wine Display"
                className="w-full h-32 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/images/index/logo.jpeg"
                alt="El-Mirabel Logo"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection; 