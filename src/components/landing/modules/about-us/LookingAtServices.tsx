'use client';

import Image from 'next/image';
import { TopBarConfig } from '../../shared';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Props = {
  src: { title: string; desc: string }[];
};

// ------------------------------------------------

export function LookingAtServices(props: Props) {
  const { src } = props;

  return (
    <div>
      <TopBarConfig
        title='نگاهی به خدمات سفرنامه 24'
        subtitle='یکی از قوی ترین خدمات های هتلداری ایران!'
        className='mb-0 lg:mb-4'
      />

      <div className='grid items-start gap-20 lg:grid-cols-[1.2fr_1fr]'>
        <Accordion type='single' collapsible>
          {src.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className='border-b last:border-none'>
              <AccordionTrigger className='text-zinc-800 text-cs08 font-bold'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 flex-center border-2 border-zinc-200 rounded-md'>
                    <span className='pt-1'>{index + 1}</span>
                  </div>

                  <span>{item.title}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className='text-cs08'>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است لورم ایپسوم متن ساختگی با تولید سادگی
                نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم لورم ایپسوم متن ساختگی با تولید سادگی
                نامفهوم از صنعت چاپ است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده میباشد.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='max-h-80 hidden overflow-hidden rounded-2xl lg:block'>
          <Image
            src={'/image/background/about-us/services.png'}
            alt='services'
            width={400}
            height={200}
            className='full-size object-cover'
          />
        </div>
      </div>
    </div>
  );
}
