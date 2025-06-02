// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CustomPaginationComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { cn } from '@/utils/utils';

// Creating and exporting CustomPagination component as default
export default function CustomPagination({
  count,
  className,
  onChange,
}: CustomPaginationComponentPropsType): ReactNode {
  // defining states of component
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Using useEffect to set onChange
  useEffect(() => {
    if (onChange) {
      onChange(activeIndex);
    }
  }, [onChange, activeIndex]);

  // Defining classname for buttons
  const buttonClassName =
    "lg:w-10 lg:h-10 w-[37px] h-[37px] lg:rounded-lg rounded-[7px] flex items-center justify-center transition-all duration-500 border data-[active='false']:border-[#d8d8d8] data-[active='false']:bg-white data-[active='false']:text-[#2b2b2b] data-[active='true']:border-blue-50 data-[active='true']:bg-blue-50 data-[active='true']:text-[#4b5bce] data-[active='false']:hover:border-blue-50 data-[active='false']:hover:bg-blue-50 data-[active='false']:hover:text-[#4b5bce]";

  // Returning JSX
  return (
    <Pagination
      className={cn(
        'lg:w-auto w-full lg:overflow-visible overflow-auto scrollbar-hide mx-0',
        className,
      )}
      dir="ltr"
    >
      <PaginationContent className="lg:w-auto w-full lg:gap-3 gap-[17px] lg:justify-start justify-center">
        <PaginationItem>
          <button
            className="lg:w-10 lg:h-10 w-[43px] h-[43px] lg:rounded-lg rounded-[7px] flex items-center justify-center text-black transition-all duration-500 bg-[#f6f6f6] hover:bg-[#D6D6D6]"
            onClick={() => {
              const prevIndex = activeIndex - 1;
              if (prevIndex > -1) setActiveIndex(prevIndex);
            }}
          >
            <IconsaxIcons
              name="ArrowUp2"
              className="-rotate-90 lg:w-4 w-[20px] lg:h-4 h-[20px] text-current"
            />
          </button>
        </PaginationItem>
        {count >= 3 ? (
          <>
            <PaginationItem>
              <button
                data-active={activeIndex === 0}
                className={buttonClassName}
                onClick={() => setActiveIndex(0)}
              >
                <span className="text-[12px] font-bold text-current">
                  1
                </span>
              </button>
            </PaginationItem>
            <PaginationItem>
              <button
                data-active={activeIndex === 1}
                className={buttonClassName}
                onClick={() => setActiveIndex(1)}
              >
                <span className="text-[12px] font-bold text-current">
                  2
                </span>
              </button>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis
                data-active={false}
                className={cn(buttonClassName, 'pointer-events-none')}
              />
            </PaginationItem>
            <PaginationItem>
              <button
                data-active={activeIndex === count - 1}
                className={buttonClassName}
                onClick={() => setActiveIndex(count - 1)}
              >
                <span className="text-[12px] font-bold text-current">
                  {count}
                </span>
              </button>
            </PaginationItem>
          </>
        ) : (
          [...new Array(count)].map((_, index) => (
            <PaginationItem key={index}>
              <button
                data-active={activeIndex === index}
                className={buttonClassName}
                onClick={() => setActiveIndex(index)}
              >
                <span className="text-[12px] font-bold text-current">
                  {index + 1}
                </span>
              </button>
            </PaginationItem>
          ))
        )}
        <PaginationItem>
          <button
            className="lg:w-10 lg:h-10 w-[43px] h-[43px] lg:rounded-lg rounded-[7px] flex items-center justify-center text-black transition-all duration-500 bg-[#f6f6f6] hover:bg-[#D6D6D6]"
            onClick={() => {
              const nextIndex = activeIndex + 1;
              if (nextIndex < count) setActiveIndex(nextIndex);
            }}
          >
            <IconsaxIcons
              name="ArrowUp2"
              className="rotate-90 lg:w-4 w-[20px] lg:h-4 h-[20px] text-current"
            />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
