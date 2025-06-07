'use client';

import {
  NavBar,
  Section,
  BackToTopBtn,
} from '@/components/landing/modules/rules';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import StickyArea from '@/components/landing/shared/StickyArea';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  text: string;
  tab_title: string;
};

type ApiResponse = {
  data: Data[];
};

// ---------------------------

export default function Rules() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-rules'],
    queryFn: () => generalInstance('/config/rules'),
  });

  const navList = data?.data.map((item, index) => {
    const { text, ...rest } = item;
    return { id: String(index), ...rest };
  });

  const [activeSection, setActiveSection] = useState('');
  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <>
      <StickyArea showSearchBar={false} fixedClassName="py-0">
        <NavBar activeSection={activeSection} navList={navList} />
      </StickyArea>

      {/* ====== Content */}
      <div className="space-y-12 xl:mt-12">
        {/* ====== Sticky-Bar (Large-Screen) */}
        <div className="sticky top-24 bg-white h-16 p-3 items-center justify-between gap-12 hidden rounded-xl shadow-[0_0_2rem_rgba(0,0,0,0.05)] lg:flex">
          <div className="flex-1">
            <NavBar activeSection={activeSection} navList={navList} />
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
        {status === 'pending' ? (
          <div className="h-96 text-cs-red flex-center">
            <div className="bars" />
          </div>
        ) : (
          data?.data.map((section, index) => (
            <Section
              key={index}
              durationOfStudy={10}
              sectionIsFirst={index === 0}
              setActiveSection={setActiveSection}
              section={{ id: String(index), ...section }}
              firstSectionID={index === 0 ? String(index) : null}
            />
          ))
        )}
      </div>
    </>
  );
}
