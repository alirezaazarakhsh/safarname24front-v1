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

import StickyArea from '@/components/landing/shared/StickyArea';

// ------------------------------

export default function Home() {
  return (
    <>
      <StickyArea
        staticClassName="mt-2"
        childrenStatus={{ static: true, fixed: true }}
        searchbarStatus={{ static: true, fixed: true }}
      />

      <div className="mt-5 flex flex-col gap-14 lg:mt-0 lg:gap-20">
        <HeroSection />
        <Services />
        <SuggestedHotels />
        <MostVisitedCities />
        <AmazingHotels />
        <AdvertisingBanners />
        <BestSellingHotels />
        <BestHotels />
        {/* <InterestingBlogs /> */}
        <CustomerReviews />
      </div>
    </>
  );
}
