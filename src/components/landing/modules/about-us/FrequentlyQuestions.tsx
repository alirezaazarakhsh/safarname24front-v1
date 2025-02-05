'use client';

import { TopBarConfig } from '../../shared';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Props = {
  src: { title: string; desc: string }[];
};

// ------------------------------------------------

export function FrequentlyQuestions(props: Props) {
  const { src } = props;

  const half = Math.ceil(src.length / 2);
  const column1 = src.slice(0, half);
  const column2 = src.slice(half);

  return (
    <div>
      <TopBarConfig title='سوالات متداول' subtitle='پرسش و پاسخ های مهم در رابط با رزرواسیون !' />

      {/* Small-Device */}
      <div className='lg:hidden'>
        <Questions src={src} />
      </div>

      {/* Large-Device */}
      <div className='hidden grid-cols-2 gap-20 lg:grid'>
        <Questions src={column1} />
        <Questions src={column2} />
      </div>
    </div>
  );
}

// ------------------------------------------------

type QuestionProps = {
  src: { title: string; desc: string }[];
};

function Questions(props: QuestionProps) {
  return (
    <Accordion type='multiple'>
      {props.src.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className='border-b last:border-none'>
          <AccordionTrigger className='text-zinc-800 text-cs08 font-bold py-5'>{item.title}</AccordionTrigger>

          <AccordionContent className='text-cs08'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
            از صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
            صنعت چاپ است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده میباشد.
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
