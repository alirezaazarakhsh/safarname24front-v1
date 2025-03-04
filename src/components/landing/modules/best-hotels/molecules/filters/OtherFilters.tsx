import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SwitchFilter from './SwitchFilter';

type Props = {};

// -------------------------------------

export default function OtherFilters(props: Props) {
  const {} = props;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="other-filters" className="xl:px-5">
        <AccordionTrigger className="text-[0.8rem] font-bold">
          سایر فیلتر ها
        </AccordionTrigger>

        <AccordionContent className="space-y-4">
          <SwitchFilter title="هتل های ظرفیت دار" id="capable" />
          <SwitchFilter title="هتل های تخفیف خورده" id="discounted" />
          <SwitchFilter title="هتل های پیشنهاد ویژه" id="special-offer" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
