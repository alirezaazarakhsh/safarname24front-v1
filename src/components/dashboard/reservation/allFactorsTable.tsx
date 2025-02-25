// Forcing next.js to render this component as client side component 
"use client";

// Importing part
import { AllFactorsTableComponentPropsType } from "@/types/dashboard/component";
import { ReactNode } from "react";
import { cn } from "@/utils/utils";
import CustomPagination from "@/components/dashboard/ui/customPagination";

// Creating and exporting AllFactorsTable component as default
export default function AllFactorsTable({ className }: AllFactorsTableComponentPropsType): ReactNode {
    // Returning JSX 
    return (
        <section className={cn("bg-white overflow-hidden rounded-lg border border-black/10", className)}>
            <div className="flex items-center justify-between gap-3 py-5 px-3">
                <span className="block truncate text-right w-full font-bold lg:text-cs85 text-[12px] text-black">
                    مشتری گرامی در این لیست شما دسترسی به تمام فاکتور ها دارید.
                </span>
                <CustomPagination count={12} />
            </div>
        </section>
    );
}
