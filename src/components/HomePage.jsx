import Hero from './Hero';
import FeaturedWines from './FeaturedWines';
import AboutSection from './AboutSection';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <FeaturedWines />
      <AboutSection />
    </div>
  );
} 