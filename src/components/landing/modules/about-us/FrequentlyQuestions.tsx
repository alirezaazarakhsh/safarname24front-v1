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

type Data = {
  answer: string;
  question: string;
  icon: { link: string };
};

type ApiResponse = { data: { faqs: Data[] } };

// ------------------------------------------------

export function FrequentlyQuestions() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-faqs'],
    queryFn: () => generalInstance('/config/faqs/?path=/about-us'),
  });

  const source = data?.data.faqs;
  const half = source && Math.ceil(source?.length / 2);

  const column1 = half ? source.slice(0, half) : undefined;
  const column2 = half ? source.slice(half) : undefined;

  if (status !== 'pending' && (!source || !source?.length)) return null;

  return (
    <div>
      <TopBarConfig title={{ type: 'single', text: 'سوالات متداول' }} />

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
          <div className="grid w-full grid-cols-2 gap-x-20 gap-y-4">
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
    </div>
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
          className="border-b last:border-none"
        >
          <AccordionTrigger className="py-5 text-cs85 font-bold text-zinc-800">
            <span className="text-cs85">{item.question}</span>
          </AccordionTrigger>

          <AccordionContent className="text-cs08/6">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
