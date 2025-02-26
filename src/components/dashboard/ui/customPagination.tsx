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
} from "@/components/ui/pagination"
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { cn } from '@/utils/utils';

// Creating and exporting CustomPagination component as default
export default function CustomPagination({ count, className, onChange }: CustomPaginationComponentPropsType): ReactNode {
    // defining states of component 
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Using useEffect to set onChange 
    useEffect(() => {
        if (onChange) {
            onChange(activeIndex);
        }
    }, [onChange, activeIndex])

    // Defining classname for buttons 
    const buttonClassName = "w-10 h-10 flex items-center rounded-lg justify-center transition-all duration-500 border data-[active='false']:border-black/20 data-[active='false']:bg-white data-[active='false']:text-black data-[active='true']:border-blue-50 data-[active='true']:bg-blue-50 data-[active='true']:text-blue-500 data-[active='false']:hover:border-blue-50 data-[active='false']:hover:bg-blue-50 data-[active='false']:hover:text-blue-500"

    // Returning JSX
    return (
        <Pagination className={cn("w-auto mx-0", className)} dir="ltr">
            <PaginationContent className="gap-3">
                <PaginationItem>
                    <button
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-black transition-all duration-500 bg-gray-50 hover:bg-gray-100"
                        onClick={() => {
                            const prevIndex = activeIndex - 1;
                            if (prevIndex > -1) setActiveIndex(prevIndex)
                        }}
                    >
                        <IconsaxIcons name="ArrowUp2" className="-rotate-90 w-4 h-4 text-current" />
                    </button>
                </PaginationItem>
                {
                    (count >= 3)
                        ? (
                            <>
                                <PaginationItem>
                                    <button
                                        data-active={(activeIndex === 0)}
                                        className={buttonClassName}        
                                        onClick={() => setActiveIndex(0)}
                                    >
                                        <span className="text-sm font-normal text-current">1</span>
                                    </button>
                                </PaginationItem>
                                <PaginationItem>
                                    <button
                                        data-active={(activeIndex === 1)}
                                        className={buttonClassName}    
                                        onClick={() => setActiveIndex(1)}
                                    >
                                        <span className="text-sm font-normal text-current">2</span>
                                    </button>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis data-active={false} className={cn(buttonClassName, "pointer-events-none")} />
                                </PaginationItem>
                                <PaginationItem>
                                    <button
                                        data-active={(activeIndex === count - 1)}
                                        className={buttonClassName}   
                                        onClick={() => setActiveIndex(count - 1)}
                                    >
                                        <span className="text-sm font-normal text-current">{count}</span>
                                    </button>
                                </PaginationItem>
                            </>
                        ) : [...new Array(count)].map((_, index) => (
                            <PaginationItem key={index}>
                                <button
                                    data-active={(activeIndex === index)}
                                    className={buttonClassName}               
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <span className="text-sm font-normal text-current">{index + 1}</span>
                                </button>
                            </PaginationItem>
                        ))
                }
                <PaginationItem>
                    <button
                        className="w-10 h-10 flex rounded-lg items-center justify-center text-black transition-all duration-500 bg-gray-50 hover:bg-gray-100"
                        onClick={() => {
                            const nextIndex = activeIndex + 1;
                            if (nextIndex < count) setActiveIndex(nextIndex)
                        }}
                    >
                        <IconsaxIcons name="ArrowUp2" className="rotate-90 w-4 h-4 text-current" />
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
