import { TopBarConfig } from '@/components/landing/shared';
import { hotelPage, facilities, suggestedHotels } from '@/constants';
import { PiCaretUpBold } from 'react-icons/pi';

import {
  Pictures,
  SectionLinks,
  Description,
  InitialInformation,
  Rooms,
  AdditionalDetails,
  EssentialTips,
  RulesAndRegulations,
  ImportantPlaces,
  Facilities,
  FrequentlyQuestions,
  CustomerReviews,
  Tags,
  SuggestedHotels,
} from '@/components/landing/modules/hotel';
import { Arrow, ArrowRight, ArrowUp, Heart } from 'iconsax-react';
import { IoCaretUp } from 'react-icons/io5';

// -----------------------------------------------------

export default function Hotel() {
  return (
    <div className="relative flex flex-col gap-12 lg:gap-16">
      <Pictures
        pictures={hotelPage.pictures}
        gallery={hotelPage.imageGallery}
      />

      {/* <div className="sticky flex flex-col justify-between gap-6 rounded-lg lg:bg-white lg:flex-row-reverse lg:items-center">
        <div className="h-[4.5rem] bg-white text-zinc-700 text-cs75 font-bold p-3 grid grid-cols-[auto_1fr_1fr] gap-3 rounded-lg lg:w-1/3 lg:rounded-xl">
          <button className="bg-zinc-100 w-8 hidden rounded-lg lg:flex-center">
            <PiCaretUpBold size="18" color="#71717a" />
          </button>

          <button className="bg-zinc-100 aspect-square flex-center rounded-lg lg:aspect-auto lg:order-3">
            <Heart
              variant="Bold"
              size="24"
              color="#a1a1aa"
              className="lg:hidden"
            />
            <span className="hidden lg:block">ذخیره کردن هتل</span>
          </button>

          <button className="bg-zinc-100 rounded-lg">اشتراک گذاری</button>

          <button className="bg-zinc-100 rounded-lg lg:hidden">
            مشاهده تصاویر هتل
          </button>
        </div>

        <div className="rounded-xl lg:w-2/3 lg:px-2 absolute bg-red-100">
          <SectionLinks />
        </div>
      </div> */}

      <div>
        <TopBarConfig title="توضیحات هتل" className="mb-1 lg:mb-1" />

        <div
          id="description"
          className="grid items-start gap-12 xl:grid-cols-2"
        >
          <Description description={hotelPage.desc} />
          <InitialInformation information={hotelPage.initialInfo} />
        </div>
      </div>

      <Rooms />
      <AdditionalDetails details={hotelPage.desc} />

      <div id="rules" className="grid items-start gap-8 lg:grid-cols-2">
        <RulesAndRegulations rules={hotelPage.rules} />
        <EssentialTips tips={hotelPage.rules} />
      </div>

      <ImportantPlaces importantPlaces={hotelPage.importantPlaces} />
      <Facilities
        facilities={facilities}
        hotelName={hotelPage.initialInfo.hotelName}
      />

      <FrequentlyQuestions
        src={[...hotelPage.services, ...hotelPage.services]}
      />

      <CustomerReviews customerReviews={hotelPage.customerReviews} />
      <Tags tags={hotelPage.tags} />
      <SuggestedHotels
        suggestedHotels={suggestedHotels}
        city={hotelPage.initialInfo.city}
      />
    </div>
  );
}
