'use client';

import Image from 'next/image';
import { TopBarConfig } from '../../shared';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Props = {
  image: string;
  src: { title: string; desc: string }[];
};

// ------------------------------------------------

export function LookingAtServices(props: Props) {
  const { src, image } = props;

  return (
    <div>
      <TopBarConfig
        subtitle="یکی از قوی ترین خدمات های هتلداری ایران !"
        title={{ type: 'single', text: 'نگاهی به خدمات سفرنامه 24' }}
      />

      <div className="grid items-start gap-20 lg:grid-cols-[1.2fr_1fr]">
        <Accordion type="single" collapsible>
          {src.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b last:border-none"
            >
              <AccordionTrigger className="text-zinc-800 text-cs85 font-bold">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex-center border-2 border-zinc-200 rounded-md">
                    <span className="pt-1">{index + 1}</span>
                  </div>

                  <span>{item.title}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="text-cs08/6">
                {item.desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="bg-zinc-200 h-80 hidden overflow-hidden rounded-2xl lg:block">
          {image && (
            <Image
              src={image}
              width={400}
              height={200}
              alt="services"
              className="full-size object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
