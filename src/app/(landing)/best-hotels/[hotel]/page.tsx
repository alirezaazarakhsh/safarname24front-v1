'use client';

import { useState } from 'react';

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

  const [activeSection, setActiveSection] = useState('');

  return (
    <>
      <StickyArea
        scrollFromTop={500}
        showInStatic={false}
        fixedClassName="pb-0"
        staticClassName="mt-6"
      >
        <div className="-mx-5">
          <SectionLinks
            sectionList={sectionLinks}
            activeSection={activeSection}
          />
        </div>
      </StickyArea>

      <div className="relative mt-8 flex flex-col gap-14 lg:mt-12 lg:gap-20">
        <Pictures pictures={pictures} gallery={imageGallery} />

        {/* === (Small-Screen) */}
        <div className="bg-white relative h-16 p-2.5 -my-8 flex gap-2.5 rounded-xl shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:hidden">
          <FavoriteButton />

          <div className="flex-1 grid grid-cols-2 gap-2.5 sm:flex-none sm:mr-auto">
            <Sharing />
            <MImageGallery
              city="تهران"
              gallery={imageGallery}
              hotelName="اسپیناس پالاس"
            />

            <DImageGallery gallery={imageGallery} />
          </div>
        </div>

        {/* === Section-Links (Small-Screen) */}
        <div className="bg-white h-12 pt-1 -mx-5 -mb-6 flex items-center overflow-hidden shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:hidden">
          <SectionLinks
            sectionList={sectionLinks}
            activeSection={activeSection}
          />
        </div>

        {/* === Large-Screen */}
        <Configs activeSection={activeSection} sectionList={sectionLinks} />

        <div>
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
        </div>

        <Section sectionID="rooms" setActiveSection={setActiveSection}>
          <Rooms rooms={rooms} hotelName={initialInfo.hotelName} />
        </Section>

        <AdditionalDetails details={desc} />

        <Section sectionID="rules" setActiveSection={setActiveSection}>
          {rules && (
            <div id="rules" className="grid items-start gap-8 lg:grid-cols-2">
              <RulesAndRegulations rules={rules} />
              <EssentialTips tips={rules} />
            </div>
          )}
        </Section>

        <Section
          sectionID="important-places"
          setActiveSection={setActiveSection}
        >
          <ImportantPlaces importantPlaces={importantPlaces} />
        </Section>

        <Section
          sectionID="facilities-services"
          setActiveSection={setActiveSection}
        >
          <Facilities
            facilities={facilities}
            hotelName={initialInfo.hotelName}
          />
        </Section>

        <Section
          sectionID="frequently-questions"
          setActiveSection={setActiveSection}
        >
          <FrequentlyQuestions src={[...services, ...services]} />
        </Section>

        <Section
          sectionID="customer-reviews"
          setActiveSection={setActiveSection}
        >
          <CustomerReviews customerReviews={customerReviews} />
        </Section>

        <Tags tags={tags} />

        <Section
          sectionID="suggested-hotels"
          setActiveSection={setActiveSection}
        >
          <SuggestedHotels
            city={initialInfo.city}
            suggestedHotels={suggestedHotels}
          />
        </Section>
      </div>
    </>
  );
}
