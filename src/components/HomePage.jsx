import React from 'react';
import Hero from './Hero';
import FeaturedWines from './FeaturedWines';
import AboutSection from './AboutSection';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedWines />
      <AboutSection />
    </div>
  );
}

export default HomePage; 