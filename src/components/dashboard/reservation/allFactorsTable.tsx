// Forcing next.js to render this component as client side component 
"use client";

// Importing part
import moment from 'jalali-moment';
import { AllFactorsTableComponentPropsType } from "@/types/dashboard/component";
import { ReactNode } from "react";
import { cn } from "@/utils/utils";
import CustomPagination from "@/components/dashboard/ui/customPagination";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { handleZeroBeforeNumber } from "@/utils/string";
import Link from 'next/link';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Loading from "@/components/dashboard/ui/loading";

// Defining some dummy data to render 
const data: {
    id: number;
    code: string;
    hotel: string;
    enterAt: string;
    exitAt: string | null;
    passengers: string;
    financialStatus: "payed" | "cancled" | "pending";
}[] = [
        {
            id: 1,
            code: "ZMA45362",
            hotel: "اسپیناس پالاس تهران",
            enterAt: new Date().toISOString(),
            exitAt: new Date().toISOString(),
            passengers: "محمد مهدی تاشا",
            financialStatus: "payed"
        },
        {
            id: 2,
            code: "ZMA45362",
            hotel: "اسپیناس پالاس تهران",
            enterAt: new Date().toISOString(),
            exitAt: null,
            passengers: "محمد مهدی تاشا",
            financialStatus: "payed"
        },
        {
            id: 3,
            code: "ZMA45362",
            hotel: "اسپیناس پالاس تهران",
            enterAt: new Date().toISOString(),
            exitAt: new Date().toISOString(),
            passengers: "محمد مهدی تاشا",
            financialStatus: "cancled"
        },
        {
            id: 4,
            code: "ZMA45362",
            hotel: "اسپیناس پالاس تهران",
            enterAt: new Date().toISOString(),
            exitAt: new Date().toISOString(),
            passengers: "محمد مهدی تاشا",
            financialStatus: "payed"
        },
        {
            id: 5,
            code: "ZMA45362",
            hotel: "اسپیناس پالاس تهران",
            enterAt: new Date().toISOString(),
            exitAt: new Date().toISOString(),
            passengers: "محمد مهدی تاشا",
            financialStatus: "pending"
        }
    ]

// Creating and exporting AllFactorsTable component as default
export default function AllFactorsTable({ className }: AllFactorsTableComponentPropsType): ReactNode {
    // Returning JSX 
    return (
        <section className={cn("bg-white overflow-hidden rounded-lg border border-black/10", className)}>
            <div className="flex items-center justify-between gap-3 py-5 px-3">
                <span className="block truncate text-right w-full font-bold lg:text-cs85 text-[12px] text-black">
                    مشتری گرامی در این لیست شما دسترسی به تمام فاکتور ها دارید.
                </span>
                <CustomPagination
                    count={12}
                // onChange={(index) => console.log(index)}
                />
            </div>
            <Table dir="rtl" className="border-none">
                <TableHeader className="bg-gray-100 border-y border-y-black/10">
                    <TableRow className="border-none">
                        <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">ردیف</TableHead>
                        <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">کد پیگیری</TableHead>
                        <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">هتل</TableHead>
                        <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">تاریخ ورود و خروج</TableHead>
                        <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">مسافران</TableHead>
                        <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">وضعیت مالی</TableHead>
                        <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((item, index) => (
                            <TableRow key={index} className={"border-b-0 bg-white hover:bg-white"}>
                                <TableCell className="p-3 w-[30px]">
                                    <div className="rounded-[5px] bg-gray-100 flex items-center justify-center h-[40px] w-full">
                                        <span className="font-normal text-[12px] text-black block">
                                            {handleZeroBeforeNumber(index + 1)}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="p-3">
                                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                                        {item.code}
                                    </span>
                                </TableCell>
                                <TableCell className="p-3">
                                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                                        {item.hotel}
                                    </span>
                                </TableCell>
                                <TableCell className="p-3">
                                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                                        {`${moment(item.enterAt).locale('fa').format('YYYY/MM/DD')} - ${(item.exitAt) ? moment(item.exitAt).locale('fa').format('YYYY/MM/DD') : "و/ن"}`}
                                    </span>
                                </TableCell>
                                <TableCell className="p-3">
                                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                                        {item.passengers}
                                    </span>
                                </TableCell>
                                <TableCell className="p-3">
                                    <div className="flex items-center justify-start gap-2">
                                        <div className="w-2 h-2 shrink-0 rounded-full" style={{ backgroundColor: (item.financialStatus === "cancled" ? "#F30F26" : (item.financialStatus === "payed") ? "#35A346" : "#4B5BCE") }} />
                                        <span className="text-xs font-medium text-gray-600 truncate block text-right">
                                            {
                                                item.financialStatus === "payed"
                                                    ? "پرداخت شده"
                                                    : item.financialStatus === "cancled"
                                                        ? "لغو شده"
                                                        : "انتظار پرداخت کاربر"
                                            }
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="p-3 flex items-center justify-end gap-3">
                                    {
                                        (item.financialStatus === "payed") && (
                                            <button className="px-6 h-[40px] rounded-md border border-red-600 bg-red-50 text-red-600 font-medium text-xs transition-all duration-500 hover:bg-red-100">
                                                کنسل
                                            </button>
                                        )
                                    }
                                    {
                                        (item.financialStatus === "payed")
                                            ? (
                                                <Link
                                                    href={`/dashboard/factor/${item.id}`}
                                                    className="w-[125px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500 bg-white border border-black/20 rounded-md text-black hover:bg-gray-100"
                                                >
                                                    <IconsaxIcons name="Eye" className="w-3 h-3 shrink-0" />
                                                    <span className="text-xs text-current font-medium">مشاهده فاکتور</span>
                                                </Link>
                                            ) : (
                                                <div className="h-[40px] w-[125px] bg-white border border-black/20 rounded-md text-black flex items-center justify-center">
                                                    {
                                                        (item.financialStatus === "cancled")
                                                            ? (
                                                                <span className="text-xs font-medium text-current">
                                                                    رزرواسیون رد شد!
                                                                </span>
                                                            ) : <Loading />
                                                    }
                                                </div>
                                            )
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    );
}
