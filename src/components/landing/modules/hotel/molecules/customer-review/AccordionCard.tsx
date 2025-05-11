'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

type Props = {
  trigger: string;
  children: React.ReactNode;
};

// --------------------------------------

export default function AccordionCard(props: Props) {
  const { trigger, children } = props;

  return (
    <Accordion
      collapsible
      type="single"
      className="bg-white px-5 overflow-hidden shadow-[0_0_1.5rem_rgba(0,0,0,0.05)] rounded-cs-10"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-cs85 font-semibold">
          {trigger}
        </AccordionTrigger>

        <AccordionContent className='pb-6'>
          <div className="h-0.5 mb-6 custom-horizontal-dashed-line" />

          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
