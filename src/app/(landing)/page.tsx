import {
  amazingHotels,
  bestHotels,
  bestSellingHotels,
  customerReviews,
  interestingBLogs,
  mostVisitedCities,
  services,
  suggestedHotels,
} from '@/constants';

import {
  Services,
  SuggestedHotels,
  MostVisitedCities,
  AmazingHotels,
  AdvertisingBanners,
  BestHotels,
  InterestingBlogs,
  CustomerReviews,
  HeroSection,
  BestSellingHotels,
} from '@/components/landing/modules/home';

// -----------------------------------------------

export default function Home() {
  return (
    <div className='mt-8 mb-20 flex flex-col gap-16 lg:mt-4 lg:gap-20'>
      <HeroSection />
      <Services services={services} />
      <SuggestedHotels suggestedHotels={suggestedHotels} />
      <MostVisitedCities cities={mostVisitedCities} />
      <AmazingHotels hotels={amazingHotels} />
      <AdvertisingBanners />
      <BestSellingHotels hotels={bestSellingHotels} />
      <BestHotels hotels={bestHotels} />
      <InterestingBlogs blogs={interestingBLogs} />
      <CustomerReviews reviews={customerReviews} />
    </div>
  );
}
