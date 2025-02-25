// Forcing next.js to render this component as client side component
'use client';

// Importing part 
import { CustomPaginationComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { cn } from '@/utils/utils';

// Creating and exporting CustomPagination component as default
export default function CustomPagination({ count, className }: CustomPaginationComponentPropsType): ReactNode {
    // defining states of component 
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Defining classname for buttons 
    const buttonClassName = "w-10 h-10 flex items-center rounded-lg justify-center transition-all duration-500 border data-[active='false']:border-black/20 data-[active='false']:bg-white data-[active='false']:text-black data-[active='true']:border-blue-50 data-[active='true']:bg-blue-50 data-[active='true']:text-blue-500 data-[active='false']:hover:border-blue-50 data-[active='false']:hover:bg-blue-50 data-[active='false']:hover:text-blue-500"

    // Returning JSX
    return (
        <Pagination className={cn("w-auto mx-0", className)}>
            <PaginationContent>
                <PaginationItem>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-black transition-all duration-500 bg-gray-50 hover:bg-gray-100">
                        <IconsaxIcons name="ArrowUp2" className="rotate-90 w-4 h-4 text-current" />
                    </button>
                </PaginationItem>
                {
                    (count >= 3)
                        ? (
                            <>
                                <PaginationItem>
                                    <button
                                        data-active={(activeIndex === 0)}
                                        className={buttonClassName}                                >
                                        <span className="text-sm font-normal text-current">1</span>
                                    </button>
                                </PaginationItem>
                                <PaginationItem>
                                    <button
                                        data-active={(activeIndex === 1)}
                                        className={buttonClassName}                                >
                                        <span className="text-sm font-normal text-current">2</span>
                                    </button>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <button
                                        data-active={(activeIndex === count - 1)}
                                        className={buttonClassName}                                >
                                        <span className="text-sm font-normal text-current">{count}</span>
                                    </button>
                                </PaginationItem>
                            </>
                        ) : [...new Array(count)].map((_, index) => (
                            <PaginationItem key={index}>
                                <button
                                    data-active={(activeIndex === index)}
                                    className={buttonClassName}                                >
                                    <span className="text-sm font-normal text-current">{index + 1}</span>
                                </button>
                            </PaginationItem>
                        ))
                }
                <PaginationItem>
                    <button className="w-10 h-10 flex rounded-lg items-center justify-center text-black transition-all duration-500 bg-gray-50 hover:bg-gray-100">
                        <IconsaxIcons name="ArrowUp2" className="-rotate-90 w-4 h-4 text-current" />
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
