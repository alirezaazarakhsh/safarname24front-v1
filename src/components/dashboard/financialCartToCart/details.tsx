// Forcing next.js to render this component as client side component
"use client";

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Skeleton } from '@/components/ui/skeleton';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETCartToCartPageDetails } from '@/types/dashboard/api/get';
import { DetailsComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX } from 'react';

// Creating and exporting Details component as default
export default function Details({ className }: DetailsComponentPropsType): JSX.Element {
  // Defining hooks
  const {
    isLoading,
    isError,
    data
  } = useApiQuery<GETCartToCartPageDetails>({
    url: "/finance/card-to-card/instruction/",
    queryKey: ["cart-to-cart-detail"],
    options: {
      staleTime: Infinity,
      refetchInterval: Infinity,
    }
  });

  // Returning JSX 
  return (
    <div className={cn('bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden flex flex-col justify-between items-center', className)}>
      <div className="flex items-center justif-start gap-3 lg:p-4 p-[14px] border-b border-b-black/10 overflow-hidden w-full shrink-0">
        <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="InfoCircle"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            توضیحات تکمیلی :
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            پیش از اقدام، توضیحات را مطالعه فرمایید.
          </p>
        </div>
      </div>
      <div className={cn(
        'lg:p-4 p-[14px] h-full w-full',
        isError
          ? "flex items-center justify-center"
          : !isLoading && data
            ? data.text
              ? "overflow-hidden"
              : "flex items-center justify-center"
            : ""
      )}>
        {
          isLoading
            ? <Skeleton className='w-full h-full rounded-lg bg-gray-200' />
            : isError
              ? (
                <span className='font-bold text-base block truncate text-center text-cs-red'>
                  خطایی در دریافت اطلاعات پیش امد.
                </span>
              )
              : (!isLoading && !isError && data)
                ? (
                  <div className='lg:pl-4 pl-0 overflow-auto custom-scrollbar w-full h-full'>
                    <p className="text-cs08 font-normal text-right block text-black/70 leading-6">
                      {data.text}
                    </p>
                  </div>
                ) : (
                  <span className='font-bold text-base block truncate text-center text-black'>
                    اطلاعاتی برای نشان دادن یافت نشد.
                  </span>
                )
        }
      </div>
    </div>

  );
}
