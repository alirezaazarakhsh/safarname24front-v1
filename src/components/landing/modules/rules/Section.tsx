'use client';

import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks';

interface Props {
  section: {
    id: string;
    desc: string;
    title: string;
  };
  sectionIsFirst: boolean;
  durationOfStudy: number;
  firstSectionID: string | null;
  setActiveSection: (sectionId: string) => void;
}

// --------------------------------------------

export function Section(props: Props) {
  const {
    sectionIsFirst,
    firstSectionID,
    durationOfStudy,
    setActiveSection,
    section: { id, desc, title },
  } = props;

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // ====== Auto Active-Section On-Scroll
  function handleScroll() {
    const section = document.getElementById(String(id));
    const rectTop = isDesktop ? 190 : 85;

    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= rectTop && rect.bottom >= 0) setActiveSection(id);
    }
  }

  // ====== Initial-Set Of Active-Section
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (window.scrollY === 0 && firstSectionID)
      setActiveSection(firstSectionID);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, setActiveSection, isDesktop]);

  return (
    <div
      id={id}
      className={`space-y-2 ${sectionIsFirst ? 'space-y-3 lg:space-ey-2' : 'space-y-2'}`}
    >
      <div className="flex-between items-center gap-4">
        <span className="text-zinc-800 text-[clamp(0.85rem,2vw,0.9rem)] font-bold lg:text-base">
          {title}
        </span>

        {sectionIsFirst && durationOfStudy && (
          <div className="bg-zinc-200/50 text-zinc-700 text-[clamp(0.7rem,2vw,0.8rem)] font-bold px-3 py-2 flex-center gap-1 rounded-md lg:hidden">
            <span>زمان مطالعه</span>
            <span>:</span>
            <span>{durationOfStudy}</span>
            <span>دقیقه</span>
          </div>
        )}
      </div>

      <p className="text-zinc-600 text-cs85/6 text-justify font-medium lg:text-cs09/7">
        {desc}
      </p>
    </div>
  );
}
