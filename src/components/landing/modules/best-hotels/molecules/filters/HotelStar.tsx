import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ICStar } from '@/components/icons';

type Props = {};

// -------------------------------------

export default function HotelStar(props: Props) {
  const {} = props;
  const [state, setState] = useState(0);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="xl:px-5">
        <AccordionTrigger className="text-[0.85rem] font-bold">
          ستاره هتل
        </AccordionTrigger>

        <AccordionContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((item) => (
            <div
              key={item}
              className="text-zinc-800 text-cs08 font-bold flex items-center select-none cursor-pointer"
              onClick={() => setState(item)}
            >
              <div className="relative bg-zinc-200/50 w-4 h-4 overflow-hidden rounded">
                <div
                  className={`absolute inset-0 bg-cs-blue transition-all duration-200 ease-in-out ${item === state ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                />
              </div>

              <span className="mr-3 ml-1">{item}</span>
              <span>ستاره</span>

              <div className="mr-auto flex items-center gap-2">
                {Array.from({ length: item }, (_, i) => i).map((_) => (
                  <ICStar key={_} className="w-4 h-4" fill="#444" />
                ))}
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
