import {
  FAQ,
  Cities,
  Features,
  TopHotels,
  HeroSection,
  RecommendedHotels,
} from '@/pages/home';

// ------------------------------

export default function Home() {
  return (
    <div className="space-y-20">
      <HeroSection />
      <Features />
      <Cities />
      <RecommendedHotels />
      <TopHotels />
      <FAQ />
    </div>
  );
}
