import {
  FAQ,
  Features,
  TopHotels,
  TopCities,
  HeroSection,
  RecommendedHotels,
} from '@/pages/home';

// ------------------------------

export default function Home() {
  return (
    <div className="space-y-20">
      <HeroSection />
      <Features />
      <RecommendedHotels />
      <TopHotels />
      <TopCities />
      <FAQ />
    </div>
  );
}
