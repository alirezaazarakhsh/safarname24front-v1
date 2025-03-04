import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SwitchFilter from './SwitchFilter';

type Props = {};

// -------------------------------------

export default function ResidenceType(props: Props) {
  const {} = props;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="residence-type" className="xl:px-5">
        <AccordionTrigger className="text-[0.8rem] font-bold">
          نوع اقامتگاه
        </AccordionTrigger>

        <AccordionContent className="space-y-4">
          <SwitchFilter title="هتل" id="hotel" />
          <SwitchFilter title="هتل آپارتمان" id="hotel-apartment" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
