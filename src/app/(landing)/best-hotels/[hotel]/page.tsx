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
import { TopBarConfig } from '@/components/landing/shared';

import Configs from '@/components/landing/modules/hotel/Configs';
import StickyArea from '@/components/landing/shared/StickyArea';

import { Section } from '@/components/landing/modules/hotel/molecules/Section';
import Sharing from '@/components/landing/modules/hotel/molecules/sharing/Sharing';

import FavoriteButton from '@/components/landing/modules/hotel/molecules/FavoriteButton';
import MImageGallery from '@/components/landing/modules/hotel/molecules/image-gallery/MImageGallery';
import DImageGallery from '@/components/landing/modules/hotel/molecules/image-gallery/DImageGallery';
import HotelWrapper from '@/components/landing/modules/hotel/molecules/HotelWrapper';

type Props = {
  params: Promise<{ hotel: string }>;
};

// ----------------------------------

export default async function Hotel(props: Props) {
  const { rooms, initialInfo, sectionLinks, suggestedHotels, customerReviews } =
    hotel;

  const { hotel: hotelSlug } = await props.params;

  return (
    <>
      <HotelWrapper>
        <StickyArea
          scrollFromTop={500}
          showInStatic={false}
          fixedClassName="pb-0"
          staticClassName="mt-5"
        >
          <div className="-mx-5 -mt-2">
            <SectionLinks sectionList={sectionLinks} />
          </div>
        </StickyArea>

        <div className="relative mt-6 flex flex-col gap-14 lg:mt-12 lg:gap-20">
          <Pictures hotelSlug={hotelSlug} />

          {/* === (Small-Screen) */}
          <div className="bg-white relative h-16 p-2.5 -my-8 flex gap-2.5 rounded-xl shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:hidden">
            <FavoriteButton />

            <div className="flex-1 grid grid-cols-2 gap-2.5 sm:flex-none sm:mr-auto">
              <Sharing />
              <MImageGallery hotelSlug={hotelSlug} />
              <DImageGallery hotelSlug={hotelSlug} />
            </div>
          </div>

          {/* === Section-Links (Small-Screen) */}
          <div className="bg-white h-12 pt-1 -mx-5 -mb-6 flex items-center overflow-hidden shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:hidden">
            <SectionLinks sectionList={sectionLinks} />
          </div>

          {/* === Large-Screen */}
          <Configs sectionList={sectionLinks} />

          {/* -------------------------- */}

          <div>
            <TopBarConfig
              className="mb-1 lg:mb-2"
              title={{ type: 'single', text: 'توضیحات هتل' }}
            />

            <div
              id="description"
              className="grid items-start gap-12 lg:grid-cols-2"
            >
              <Description hotelSlug={hotelSlug} />
              <InitialInformation hotelSlug={hotelSlug} />
            </div>
          </div>

          <Rooms rooms={rooms} hotelName={initialInfo.hotelName} />
          <AdditionalDetails hotelSlug={hotelSlug} />

          <Section
            sectionID="rules"
            className="grid items-start gap-8 lg:grid-cols-2"
          >
            <RulesAndRegulations hotelSlug={hotelSlug} />
            <EssentialTips hotelSlug={hotelSlug} />
          </Section>

          <ImportantPlaces hotelSlug={hotelSlug} />
          <Facilities hotelSlug={hotelSlug} />
          <FrequentlyQuestions hotelSlug={hotelSlug} />
          <CustomerReviews customerReviews={customerReviews} />
          <Tags hotelSlug={hotelSlug} />

          <SuggestedHotels
            city={initialInfo.city}
            suggestedHotels={suggestedHotels}
          />
        </div>
      </HotelWrapper>
    </>
  );
}
