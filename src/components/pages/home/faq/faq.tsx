import { SectionTitle } from '@/components/common/section-topbar/section-title';
import { HOTEL_FAQS } from './constants';

import { FAQGeneral } from '@/components/common/faq/faq-general';

// ------------------------------

export function FAQ() {
  return (
    <section className="space-y-8">
      <SectionTitle className="w-full text-center">سوالات متداول</SectionTitle>

      <FAQGeneral data={HOTEL_FAQS} />
    </section>
  );
}
