'use client';

import { useState } from 'react';

import { rules } from '@/constants/landing';
import StickyArea from '@/components/landing/shared/header/StickyArea';

import {
  NavBar,
  Section,
  BackToTopBtn,
  FrequentlyQuestions,
} from '@/components/landing/modules/rules';

// --------------------------------------------

export default function Rules() {
  const { navbar, sections, services } = rules;
  const [activeSection, setActiveSection] = useState('');

  return (
    <>
      <StickyArea className="py-0">
        <NavBar activeSection={activeSection} navList={navbar} />
      </StickyArea>

      {/* ====== Content */}
      <div className="space-y-12 xl:mt-12">
        {/* ====== Sticky-Bar (Large-Screen) */}
        <div className="sticky top-24 bg-white h-16 p-3 items-center justify-between gap-12 hidden rounded-xl shadow-[0_0_2rem_rgba(0,0,0,0.05)] lg:flex">
          <div className="flex-1">
            <NavBar activeSection={activeSection} navList={navbar} />
          </div>

          <div className="w-fit h-full flex gap-2">
            <BackToTopBtn />

            <div className="bg-zinc-100 text-zinc-700 text-cs08 font-bold px-5 flex-center gap-1 rounded-lg">
              <span>زمان مطالعه</span>
              <span>:</span>
              <span>10</span>
              <span>دقیقه</span>
            </div>
          </div>
        </div>

        {/* ====== Sections */}
        {sections?.map((section, index) => (
          <Section
            key={section.id}
            section={section}
            durationOfStudy={10}
            sectionIsFirst={index === 0}
            setActiveSection={setActiveSection}
            firstSectionID={index === 0 ? section.id : null}
          />
        ))}

        {/* ====== Other-Components */}
        <FrequentlyQuestions
          src={[...services.services, ...services.services]}
        />
      </div>
    </>
  );
}
