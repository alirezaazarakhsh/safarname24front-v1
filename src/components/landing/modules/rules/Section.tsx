'use client';

import { useCallback, useEffect } from 'react';
import { useMediaQuery } from '@/hooks';
import DOMPurify from 'dompurify';

interface Props {
  section: {
    id: string;
    text: string;
    tab_title: string;
  };
  sectionIsFirst: boolean;
  firstSectionID: string | null;
  setActiveSection: (sectionId: string) => void;
}

// --------------------------------------------

export function Section(props: Props) {
  const {
    sectionIsFirst,
    firstSectionID,
    setActiveSection,
    section: { id, text, tab_title },
  } = props;

  // محاسبه زمان مطالعه بر اساس تعداد کاراکتر
  const plainText = text.replace(/<[^>]*>/g, '');
  const charCount = plainText.length;
  const durationOfStudy = Math.ceil(charCount / 1000); // فرض 1000 کاراکتر در دقیقه

  // چک کن آیا متن با tab_title شروع می‌شود
  const shouldShowTabTitle = !plainText.trim().startsWith(tab_title.trim());

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleScroll = useCallback(() => {
    const section = document.getElementById(String(id));
    const rectTop = isDesktop ? 190 : 85;

    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= rectTop && rect.bottom >= 0) setActiveSection(id);
    }
  }, [id, isDesktop, setActiveSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (window.scrollY === 0 && firstSectionID) setActiveSection(firstSectionID);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, setActiveSection, isDesktop, firstSectionID, handleScroll]);

  return (
    <div
      id={id}
      className={`space-y-2 ${sectionIsFirst ? 'space-y-3 lg:space-ey-2' : 'space-y-2'}`}
    >
      <div className="flex-between items-center gap-4">
        {shouldShowTabTitle && (
          <span className="text-zinc-800 text-[clamp(0.85rem,2vw,0.9rem)] font-bold lg:text-base">
            {tab_title}
          </span>
        )}

        {sectionIsFirst && durationOfStudy && (
          <div className="bg-zinc-200/50 text-zinc-700 text-[clamp(0.7rem,2vw,0.8rem)] font-bold px-3 py-2 flex-center gap-1 rounded-md lg:hidden">
            <span>زمان مطالعه</span>
            <span>:</span>
            <span>{durationOfStudy}</span>
            <span>دقیقه</span>
          </div>
        )}
      </div>

      {/* متن کامل را sanitize و نمایش بده */}
      <div
        className="text-zinc-600 text-cs85/6 text-justify font-normal lg:text-cs09/7 rules-content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(text, {
            ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'mark', 'span', 'div', 'a', 'table', 'tr', 'td', 'th', 'tbody', 'thead', 'tfoot'],
            ALLOWED_ATTR: ['style', 'class', 'dir', 'href', 'colspan', 'rowspan']
          })
        }}
      />
    </div>
  );
}
