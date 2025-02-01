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
    <>
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
    </>
  );
}
