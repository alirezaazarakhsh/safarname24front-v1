import { imageGallery, hotelPage, facilities, suggestedHotels } from '@/constants';

import {
  AdditionalDetails,
  Description,
  EssentialTips,
  Facilities,
  InitialInformation,
  Pictures,
  RulesAndRegulations,
  SectionLinks,
  FrequentlyQuestions,
  SuggestedHotels,
  Tags,
} from '@/components/landing/modules/hotel';

import { TopBarConfig } from '@/components/landing/shared';

// -----------------------------------------------------

export default function Hotel() {
  return (
    <div className='relative flex flex-col gap-12 lg:gap-16'>
      <Pictures pictures={hotelPage.pictures} gallery={imageGallery} />
      {/* <SectionLinks /> */}

      <div>
        <TopBarConfig title='توضیحات هتل' className='mb-1 lg:mb-1' />

        <div className='grid items-start gap-12 xl:grid-cols-2'>
          <Description description={hotelPage.desc} />
          <InitialInformation information={hotelPage.initialInfo} />
        </div>
      </div>

      <AdditionalDetails details={hotelPage.desc} />

      <div className='grid items-start gap-8 lg:grid-cols-2'>
        <RulesAndRegulations rules={hotelPage.rules} />
        <EssentialTips tips={hotelPage.rules} />
      </div>

      <Facilities facilities={facilities} hotelName={hotelPage.initialInfo.hotelName} />
      <FrequentlyQuestions src={[...hotelPage.services, ...hotelPage.services]} />
      <Tags tags={hotelPage.tags} />
      <SuggestedHotels suggestedHotels={suggestedHotels} city={hotelPage.initialInfo.city} />
    </div>
  );
}
