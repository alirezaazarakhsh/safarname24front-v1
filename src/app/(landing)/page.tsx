import {
  Services,
  BestHotels,
  HeroSection,
  AmazingHotels,
  SuggestedHotels,
  CustomerReviews,
  InterestingBlogs,
  BestSellingHotels,
  MostVisitedCities,
  AdvertisingBanners,
} from '@/components/landing/modules/home';

import { home } from '@/constants/landing';
import StickyArea from '@/components/landing/shared/StickyArea';

// -----------------------------------------------

export default function Home() {
  const {
    amazingHotels,
    interestingBLogs,
    mostVisitedCities,
    bestSellingHotels,
  } = home;

  return (
    <>
      <StickyArea />

<<<<<<< HEAD
      <div className="mt-6 flex flex-col gap-14 lg:gap-20 lg:mt-0">
        <HeroSection />
        <Services />
=======
      <div className="mt-6 flex flex-col gap-14 lg:gap-20 lg:mt-0">
        <HeroSection />
        <Services />
>>>>>>> mahdi-tasha
        <SuggestedHotels suggestedHotels={home.suggestedHotels} />
        <MostVisitedCities cities={mostVisitedCities} />
        <AmazingHotels hotels={amazingHotels} />
        <AdvertisingBanners />
        <BestSellingHotels hotels={bestSellingHotels} />
        <BestHotels />
        <InterestingBlogs blogs={interestingBLogs} />
        <CustomerReviews />
      </div>
    </>
  );
}
