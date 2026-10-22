import { cn } from '@/lib/utils';
import { FaqItem } from './faq-item';

import { FAQ as FAQ_Type } from '@/lib/types/general';
import { Accordion } from '@/components/ui/accordion';

type Props = {
  data: FAQ_Type[];
  className?: string;
  faqItemClassName?: string;
};

// ------------------------------

export function FAQGeneral(props: Props) {
  const { data, className, faqItemClassName } = props;

  if (!data || !Array.isArray(data)) return null;
  const half_length = Math.ceil(data.length / 2);

  return (
    <div
      className={cn(
        'bg-card -mx-4 px-5 lg:px-6 xl:mx-0 xl:rounded-3xl xl:px-10 xl:py-4',
        className,
      )}
    >
      {/* Small-screen */}
      <Accordion className={'lg:hidden'}>
        {data.map((item, index) => (
          <FaqItem data={item} key={index} className={faqItemClassName} />
        ))}
      </Accordion>

      {/* Large-screen */}
      <div className="hidden grid-cols-2 gap-16 lg:grid xl:gap-24">
        <Accordion multiple>
          {data.slice(0, half_length).map((item, index) => (
            <FaqItem data={item} key={index} className={faqItemClassName} />
          ))}
        </Accordion>

        <Accordion multiple>
          {data.slice(half_length).map((item, index) => (
            <FaqItem data={item} key={index} className={faqItemClassName} />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
