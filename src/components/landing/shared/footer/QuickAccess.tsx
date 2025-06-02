'use client';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  title: string;
  order: number;
  page: {
    path: string;
  };
};

type ApiResponse = {
  data: Data[];
};

// --------------------------------

export default function QuickAccess() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['quick-access'],
    queryFn: () => generalInstance('/config/quick-access'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <>
      {/* Small-Device */}
      <div className="w-full xl:hidden">
        {status === 'pending' ? (
          <Skeleton className="h-12 my-2" />
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="quick-access">
              <AccordionTrigger className="bg-zinc-100 w-full h-12 px-4 my-2 text-zinc-800 font-semibold rounded-cs-10">
                دسترسی سریع
              </AccordionTrigger>

              <AccordionContent className="grid grid-cols-2 gap-2">
                {data?.data
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => (
                    <Link
                      key={index}
                      href={item.page.path}
                      className="bg-zinc-100 h-10 text-zinc-800 text-cs07 font-bold px-4 flex-center rounded-cs-10 transition-colors ease-in-out hover:bg-cs-red hover:text-zinc-100"
                    >
                      {item.title}
                    </Link>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      {/* Large-Device */}
      <div className="w-full h-12 px-6 my-4 hidden items-center justify-between gap-4 xl:flex">
        <h4 className="text-zinc-800 text-cs85 font-bold hidden xl:block">
          دسترسی سریع :
        </h4>

        <div className="flex-1 h-full flex-between gap-4 xl:flex-none">
          {status === 'pending' ? (
            <div className="flex gap-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="w-28" />
                ))}
            </div>
          ) : (
            data?.data
              .sort((a, b) => a.order - b.order)
              .map((item, index) => (
                <Link
                  key={index}
                  href={item.page.path}
                  className="bg-zinc-100 text-zinc-800 text-cs07 font-bold px-4 flex-center rounded-cs-10 transition-colors ease-in-out duration-200 hover:bg-cs-red hover:text-zinc-100 xl:text-cs75"
                >
                  {item.title}
                </Link>
              ))
          )}
        </div>
      </div>
    </>
  );
}
