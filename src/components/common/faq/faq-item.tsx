import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { cn } from '@/lib/utils';

import { FAQ as FAQItemType } from '@/lib/types/general';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

type Props = AccordionPrimitive.Item.Props & {
  data: FAQItemType;
  className?: string;
};

// ------------------------------

export function FaqItem(props: Props) {
  const { data, className, key } = props;

  return (
    <AccordionItem value={key} className={cn('', className)}>
      <AccordionTrigger className={'py-5'}>
        <p>{data.question}</p>
      </AccordionTrigger>

      <AccordionContent>{data.answer}</AccordionContent>
    </AccordionItem>
  );
}
