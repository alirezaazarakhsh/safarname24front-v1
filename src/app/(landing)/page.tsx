import {
  FAQ,
  Features,
  TopHotels,
  TopCities,
  HeroSection,
  DiscountedHotels,
  RecommendedHotels,
} from '@/components/pages/home';

import { Suspense } from 'react';

// ------------------------------

export default function Home() {
  return (
    <div className="space-y-20">
      <Suspense>
        <HeroSection />
      </Suspense>

      <Features />
      <TopCities />
      <RecommendedHotels />
      <DiscountedHotels />
      <TopHotels />
      <FAQ />
    </div>
  );
}
