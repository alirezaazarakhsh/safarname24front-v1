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
    services,
    bestHotels,
    heroSection,
    amazingHotels,
    customerReviews,
    interestingBLogs,
    mostVisitedCities,
    bestSellingHotels,
    advertisingBanners,
  } = home;

  return (
    <>
      <StickyArea />

      <div className='mt-6 flex flex-col gap-14 lg:gap-20 lg:mt-0'>
        <HeroSection images={heroSection.images} />
        <Services services={services} />
        <SuggestedHotels suggestedHotels={home.suggestedHotels} />
        <MostVisitedCities cities={mostVisitedCities} />
        <AmazingHotels hotels={amazingHotels} />
        <AdvertisingBanners banners={advertisingBanners} />
        <BestSellingHotels hotels={bestSellingHotels} />
        <BestHotels hotels={bestHotels} />
        <InterestingBlogs blogs={interestingBLogs} />
        <CustomerReviews reviews={customerReviews} />
      </div>
    </>
  );
}
