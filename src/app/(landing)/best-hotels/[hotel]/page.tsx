import {
  Tags,
  Rooms,
  Pictures,
  Facilities,
  Description,
  SectionLinks,
  EssentialTips,
  SuggestedHotels,
  ImportantPlaces,
  CustomerReviews,
  AdditionalDetails,
  InitialInformation,
  RulesAndRegulations,
  FrequentlyQuestions,
} from '@/components/landing/modules/hotel';

import { hotel } from '@/constants/landing';
import { PiCaretUpBold } from 'react-icons/pi';
import { TopBarConfig } from '@/components/landing/shared';

import { Arrow, ArrowRight, ArrowUp, Heart } from 'iconsax-react';
import { IoCaretUp } from 'react-icons/io5';

import SearchBar from '@/components/landing/shared/search/SearchBar';
import StickyArea from '@/components/landing/shared/header/StickyArea';

// -----------------------------------------------------

export default function Hotel() {
  const {
    tags,
    desc,
    rules,
    rooms,
    services,
    pictures,
    facilities,
    initialInfo,
    sectionLinks,
    imageGallery,
    importantPlaces,
    suggestedHotels,
    customerReviews,
  } = hotel;

  return (
    <>
      <StickyArea>
        <SearchBar />
      </StickyArea>

      <div className="relative mt-8 flex flex-col gap-12 lg:mt-12 lg:gap-16">
        <Pictures pictures={pictures} gallery={imageGallery} />

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

        {/* <div>
          <TopBarConfig
            title={{ type: 'single', text: 'توضیحات هتل' }}
            className="mb-1 lg:mb-2"
          />

          <div
            id="description"
            className="grid items-start gap-12 lg:grid-cols-2"
          >
            <Description description={desc} />
            <InitialInformation information={initialInfo} />
          </div>
        </div> */}

        {/* <Rooms
          rooms={rooms}
          hotelName={initialInfo.hotelName}
          numberOfRooms={initialInfo.numberOfRooms}
        /> */}

        {/* <AdditionalDetails details={desc} />

        {rules && (
          <div id="rules" className="grid items-start gap-8 lg:grid-cols-2">
            <RulesAndRegulations rules={rules} />
            <EssentialTips tips={rules} />
          </div>
        )}

        <ImportantPlaces importantPlaces={importantPlaces} /> */}
        <Facilities facilities={facilities} hotelName={initialInfo.hotelName} />
        {/* <FrequentlyQuestions src={[...services, ...services]} />
        <CustomerReviews customerReviews={customerReviews} />

        <Tags tags={tags} />
        <SuggestedHotels
          city={initialInfo.city}
          suggestedHotels={suggestedHotels}
        /> */}
      </div>
    </>
  );
}
