import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Trash } from 'iconsax-react';

type Props = {
  history: Array<{ id: number; hotel: string; city: string }>;
};

// -----------------------------------

export default function SearchHistory(props: Props) {
  const { history } = props;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b border-zinc-200">
        <AccordionTrigger className="text-cs08 font-bold py-1 mt-4 mb-2.5">
          جستجو های اخیر
        </AccordionTrigger>

        <AccordionContent className="pb-3">
          <div className="space-y-2">
            {history?.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="text-zinc-500 text-cs08 font-semibold flex-between items-center gap-2.5 group select-none cursor-pointer rounded-l-lg"
              >
                <div className="flex-center gap-1">
                  <span>هتل</span>
                  <span>{item.hotel}</span>
                  <span>-</span>
                  <span>{item.city}</span>
                </div>

                <button className="bg-cs-red/10 w-8 h-8 flex-center rounded-md">
                  <Trash size={18} color="#f30f26" />
                </button>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
