// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CustomPaginationComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { cn } from '@/utils/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting CustomPagination component as default
export default function CustomPagination({
  count,
  className,
  loading = false,
  activeIndex = 0,
  setActiveIndex,
}: CustomPaginationComponentPropsType): ReactNode {
  // Defining classname for buttons
  const buttonClassName =
    "lg:w-10 lg:h-10 w-[37px] h-[37px] lg:rounded-lg rounded-[7px] flex items-center justify-center transition-all duration-500 border data-[active='false']:border-[#d8d8d8] data-[active='false']:bg-white data-[active='false']:text-[#2b2b2b] data-[active='true']:border-blue-50 data-[active='true']:bg-blue-50 data-[active='true']:text-[#4b5bce] data-[active='false']:hover:border-blue-50 data-[active='false']:hover:bg-blue-50 data-[active='false']:hover:text-[#4b5bce]";

  // Generate relative page numbers based on current active index
  const totalPages = Math.ceil(count / 18);

  const getPageNumbers = () => {
    if (activeIndex !== undefined) {
      return Array.from({ length: totalPages }, (_, i) => i);
    } else return [0, 1, 2, 3, 5];
  };

  // Conditional rendering
  if (loading) {
    return (
      <div
        className={cn(
          'lg:w-auto w-full lg:overflow-visible overflow-auto scrollbar-hide mx-0 flex items-center',
          className,
        )}
      >
        <div className='lg:w-auto w-full lg:gap-3 gap-[17px] flex justify-between items-center'>
          {[...new Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              className={
                'lg:w-10 lg:h-10 w-[37px] h-[37px] lg:rounded-lg rounded-[7px]'
              }
            />
          ))}
        </div>
      </div>
    );
  } else if (count > 18) {
    return (
      <Pagination
        className={cn(
          'lg:w-auto w-full lg:overflow-visible overflow-auto scrollbar-hide mx-0',
          className,
        )}
        dir='ltr'
      >
        <PaginationContent className='lg:w-auto w-full lg:gap-3 gap-[17px] lg:justify-start justify-center'>
          <PaginationItem>
            <button
              className='lg:w-10 lg:h-10 w-[43px] h-[43px] lg:rounded-lg rounded-[7px] flex items-center justify-center text-black transition-all duration-500 bg-[#f6f6f6] hover:bg-[#D6D6D6]'
              onClick={() => {
                if (activeIndex !== undefined && setActiveIndex) {
                  const prevIndex = activeIndex - 1;
                  if (prevIndex > -1) setActiveIndex(prevIndex);
                }
              }}
            >
              <IconsaxIcons
                name='ArrowUp2'
                className='-rotate-90 lg:w-4 w-[20px] lg:h-4 h-[20px] text-current'
              />
            </button>
          </PaginationItem>
          {getPageNumbers().map((_, pageIndex) => (
            <PaginationItem key={pageIndex}>
              <button
                data-active={activeIndex === pageIndex}
                className={buttonClassName}
                onClick={() => setActiveIndex && setActiveIndex(pageIndex)}
              >
                <span className='text-[12px] font-bold text-current'>
                  {pageIndex + 1}
                </span>
              </button>
            </PaginationItem>
          ))}
          <PaginationItem>
            <button
              className='lg:w-10 lg:h-10 w-[43px] h-[43px] lg:rounded-lg rounded-[7px] flex items-center justify-center text-black transition-all duration-500 bg-[#f6f6f6] hover:bg-[#D6D6D6]'
              onClick={() => {
                if (activeIndex !== undefined && setActiveIndex) {
                  const nextIndex = activeIndex + 1;
                  if (nextIndex < totalPages) setActiveIndex(nextIndex);
                }
              }}
            >
              <IconsaxIcons
                name='ArrowUp2'
                className='rotate-90 lg:w-4 w-[20px] lg:h-4 h-[20px] text-current'
              />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  } else return false;
}
