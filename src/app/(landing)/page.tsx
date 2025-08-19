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
      <StickyArea searchbarStatus={{ static: false, fixed: true }} />

      <div className="mt-4 flex flex-col gap-14 lg:gap-20 lg:mt-0">
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
