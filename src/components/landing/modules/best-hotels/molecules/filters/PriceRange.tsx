import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { useState } from 'react';
import ReactSlider from 'react-slider';

import { numberSeparation } from '@/utils';

type Props = {
  min?: number;
  max?: number;
};

// -------------------------------------

export function PriceRange(props: Props) {
  const { min = 0, max = 45_000_000 } = props;
  const [priceRange, setPriceRange] = useState({
    min: min,
    max: max,
  });

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="price-range" className="lg:px-5">
        <AccordionTrigger className="text-[0.85rem] font-bold">
          محدوده قیمت
        </AccordionTrigger>

        <AccordionContent>
          <ReactSlider
            invert
            min={min}
            max={max}
            step={200}
            className="w-full h-4 flex-center"
            renderTrack={(props, state) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  className={`h-1 rounded-full ${
                    state.index === 1 ? 'bg-cs-blue' : 'bg-zinc-100'
                  }`}
                />
              );
            }}
            thumbClassName="bg-cs-blue w-3 h-3 rounded-full"
            value={[priceRange.min, priceRange.max]}
            onChange={(value: number[]) =>
              setPriceRange({ min: value[0], max: value[1] })
            }
          />

          <div className="text-zinc-500 text-cs65 font-bold mt-2 mb-4 flex-between">
            <span>حداقل</span>
            <span>حداکثر</span>
          </div>

          <div className="h-10 text-zinc-800 text-cs75 font-extrabold grid grid-cols-[1fr_1.5rem_1fr] gap-2">
            <div className="bg-zinc-100 flex-center gap-1 rounded-lg">
              <span>{numberSeparation(priceRange.min)}</span>
            </div>

            <div className="relative text-cs65 pt-2 flex-center">
              <span>توما</span>
              <span className="absolute top-1 left-1">ن</span>
            </div>

            <div className="bg-zinc-100 flex-center gap-1 rounded-lg">
              <span>{numberSeparation(priceRange.max)}</span>
              <span>+</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
