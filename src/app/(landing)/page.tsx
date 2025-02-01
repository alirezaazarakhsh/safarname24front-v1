import {
  amazingHotels,
  bestHotels,
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
} from '@/components/landing/modules/home';

export default function Home() {
  return (
    <>
      <Services services={services} />
      <SuggestedHotels suggestedHotels={suggestedHotels} />
      <MostVisitedCities cities={mostVisitedCities} />
      <AmazingHotels hotels={amazingHotels} />
      <AdvertisingBanners />
      <BestHotels hotels={bestHotels} />
      <InterestingBlogs blogs={interestingBLogs} />
      <CustomerReviews reviews={customerReviews} />
    </>
  );
}
