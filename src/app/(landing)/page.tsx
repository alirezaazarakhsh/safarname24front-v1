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
import SearchBar from '@/components/landing/shared/search/SearchBar';
import StickyArea from '@/components/landing/shared/header/StickyArea';

// -----------------------------------------------

export default function Home() {
  const {
    advertisingBanners,
    amazingHotels,
    bestHotels,
    bestSellingHotels,
    customerReviews,
    heroSection,
    interestingBLogs,
    mostVisitedCities,
    services,
  } = home;

  return (
    <>
      <StickyArea>
        <SearchBar />
      </StickyArea>

      <div className="mt-6 flex flex-col gap-14 lg:gap-20 xl:mt-0">
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
