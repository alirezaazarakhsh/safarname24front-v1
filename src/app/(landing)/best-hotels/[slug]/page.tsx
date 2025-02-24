import { TopBarConfig } from '@/components/landing/shared';
import { hotelPage, facilities, suggestedHotels } from '@/constants';

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

// -----------------------------------------------------

export default function Hotel() {
  return (
    <div className="relative flex flex-col gap-12 lg:gap-16">
      <Pictures
        pictures={hotelPage.pictures}
        gallery={hotelPage.imageGallery}
      />
      {/* <SectionLinks /> */}

      <div>
        <TopBarConfig title="توضیحات هتل" className="mb-1 lg:mb-1" />

        <div className="grid items-start gap-12 xl:grid-cols-2">
          <Description description={hotelPage.desc} />
          <InitialInformation information={hotelPage.initialInfo} />
        </div>
      </div>

      <Rooms />
      <AdditionalDetails details={hotelPage.desc} />

      <div className="grid items-start gap-8 lg:grid-cols-2">
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
