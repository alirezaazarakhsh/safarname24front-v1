'use client';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { TopBarConfig } from '../../shared';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';
import { Section } from './molecules/Section';

type Data = {
  answer: string;
  question: string;
  icon: { link: string };
};

type ApiResponse = { data: Data[] };

type Props = {
  hotelSlug: string;
};

// ------------------------------------------------

export function FrequentlyQuestions(props: Props) {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-faqs'],
    queryFn: () => generalInstance(`/hotel/hotels/${props.hotelSlug}/faq`),
  });

  const source = data?.data;
  const half = source && Math.ceil(source?.length / 2);

  const column1 = source?.slice(0, half);
  const column2 = source?.slice(half);

  if (status !== 'pending' && (!source || !source?.length)) return null;

  return (
    <Section sectionID="frequently-questions">
      <TopBarConfig
        title={{ type: 'single', text: 'سوالات متداول' }}
        subtitle="پرسش و پاسخ های مهم در رابط با رزرواسیون !"
      />

      {/* Small-Device */}
      <div className="lg:hidden">
        {status === 'pending' ? (
          <div className="grid gap-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-14 rounded-lg" />
              ))}
          </div>
        ) : (
          <Questions src={source} />
        )}
      </div>

      {/* Large-Device */}
      <div className="hidden lg:block">
        {status === 'pending' ? (
          <div className="w-full grid grid-cols-2 gap-x-20 gap-y-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-14 rounded-lg" />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-20">
            <Questions src={column1} />
            <Questions src={column2} />
          </div>
        )}
      </div>
    </Section>
  );
}

// ---------------------------------------

type QuestionProps = {
  src?: Array<Data>;
};

function Questions(props: QuestionProps) {
  if (!props.src) return null;

  return (
    <Accordion type="multiple">
      {props?.src?.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b last:border-none gap-4"
        >
          <AccordionTrigger className="text-zinc-800 text-cs08/6 font-bold py-5 lg:text-cs85/6">
            <div className="flex items-center gap-3">
              {item.icon.link && (
                <Image src={item.icon.link} alt="icon" width={24} height={24} />
              )}

              <div className="text-right">{item.question}</div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="text-cs08/6">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
