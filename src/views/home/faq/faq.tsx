import { HOTEL_FAQS } from './constants';

import { FAQGeneral } from '@/components/common/faq/faq-general';

// ------------------------------

export function FAQ() {
  return (
    <section className="space-y-8">
      <span className="inline-block w-full text-center font-black lg:text-lg">
        سوالات متداول
      </span>

      <FAQGeneral data={HOTEL_FAQS} />
    </section>
  );
}
