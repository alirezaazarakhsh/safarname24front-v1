'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Props = {
  src: { title: string; href: string }[];
};

// --------------------------------------

export default function QuickAccess(props: Props) {
  const { src } = props;

  return (
    <>
      {/* Small-Device */}
      <div className='w-full xl:hidden'>
        <Accordion type='single' collapsible>
          <AccordionItem value='quick-access'>
            <AccordionTrigger className='bg-zinc-100 w-full h-12 px-4 mt-2 mb-2 text-zinc-800 font-semibold rounded-cs-10'>
              دسترسی سریع
            </AccordionTrigger>

            <AccordionContent className='grid grid-cols-2 gap-2'>
              {src.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='bg-zinc-100 h-10 text-zinc-800 text-cs07 font-bold px-4 flex-center rounded-cs-10 transition-colors ease-in-out hover:bg-cs-red hover:text-zinc-100'
                >
                  {item.title}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Large-Device */}
      <div className='w-full h-12 px-6 my-4 hidden items-center justify-between gap-4 xl:flex'>
        <h4 className='text-zinc-800 text-cs85 font-bold hidden xl:block'>دسترسی سریع :</h4>

        <div className='flex-1 h-full flex-between gap-4 xl:flex-none'>
          {src.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='bg-zinc-100 text-zinc-800 text-cs07 font-bold px-4 flex-center rounded-cs-10 transition-colors ease-in-out duration-200 hover:bg-cs-red hover:text-zinc-100 xl:text-cs75'
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
