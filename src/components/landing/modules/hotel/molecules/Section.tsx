'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

import { useMediaQuery } from '@/hooks';
import { useActiveSection } from '@/context/HotelActiveSectionContext';

interface Props {
  sectionID: string;
  className?: string;
  children: React.ReactNode;
}

// --------------------------------------------

export function Section(props: Props) {
  const { sectionID, className, children } = props;

  const { updateActiveSection } = useActiveSection();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // ====== Auto Active-Section On-Scroll
  useEffect(() => {
    function handleScroll() {
      const section = document.getElementById(String(sectionID));
      const rectTop = isDesktop ? 140 : 160;

      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= rectTop && rect.bottom >= 0)
          updateActiveSection(sectionID);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionID, updateActiveSection, isDesktop]);

  return (
    <div id={sectionID} className={clsx('', className)}>
      {children}
    </div>
  );
}
