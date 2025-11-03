'use client';

import { useEffect, useRef, useState } from 'react';

import { BackToTopBtn } from '../rules';
import { SectionLinks } from './SectionLinks';

import Sharing from './molecules/sharing/Sharing';
import { FavoriteButton } from './molecules/favorite-button';

type Props = {
  hotelSlug: string;
  sectionList: Array<{ id: string; title: string }>;
};

// -----------------------------------------------------

export default function Configs(props: Props) {
  const { sectionList, hotelSlug } = props;

  const [isAtTop, setIsAtTop] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Check Structure-Position
  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const { top } = stickyRef.current.getBoundingClientRect();
      setIsAtTop(top <= 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={stickyRef}
      className={`sticky z-30 top-2 bg-[#f8f8f8] h-16 py-3 -mt-10 -mb-8 items-center justify-between gap-12 hidden transition-all duration-300 lg:flex lg:-mt-12 ${isAtTop ? 'px-0' : 'px-4 shadow-[0_0_2rem_rgba(0,0,0,0.08)] rounded-xl'}`}
    >
      <div className="flex-1">
        <SectionLinks sectionList={sectionList} />
      </div>

      <div className="w-fit h-full flex gap-2">
        <BackToTopBtn />
        <Sharing />
        <FavoriteButton hotelSlug={hotelSlug} />
      </div>
    </div>
  );
}
