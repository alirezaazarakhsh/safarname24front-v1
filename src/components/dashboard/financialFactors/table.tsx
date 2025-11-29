// Forcing next.js to render this component as client side component
'use client';

// Importing part
import moment from 'jalali-moment';
import { FinancialFatorsDashboardTablePropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { handleZeroBeforeNumber } from '@/utils/string';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Image from 'next/image';
import EmptyImage from '../../../../public/image/empty.png';
import { numberSeparation } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting FactorsTable component as default
export default function FactorsTable({
  className,
  data,
  loading, paginationActiveIndex, setPaginationActiveIndex, paginationCount
}: FinancialFatorsDashboardTablePropsType): ReactNode {
  // Conditional rendering
  if (loading) {
    return (
      <section
        className={cn(
          'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:border border-black/10',
          className,
        )}
      >
        <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
          <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
            مشتری گرامی در این لیست شما دسترسی به تمام ریز گزارشات دارید.
          </span>
          <CustomPagination
            count={12}
            loading
          />
        </div>
        <Table dir="rtl" className="border-none lg:table hidden">
          <TableHeader className="bg-gray-100 border-y border-y-black/10">
            <TableRow className="border-none">
              <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                ردیف
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                نوع خدمات
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                مبلغ صورتحساب
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                تاریخ
              </TableHead>
              <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...new Array(10)].map((item, index) => (
              <TableRow
                key={index}
                className={cn(
                  'bg-white hover:bg-white',
                  index + 1 !== data.length
                    ? 'border-b border-b-black/10'
                    : 'border-b-0',
                )}
              >
                <TableCell className="p-3 w-[30px]">
                  <Skeleton className="rounded-[5px] h-[40px] w-full" />
                </TableCell>
                <TableCell className="p-3">
                  <Skeleton className="rounded-[5px] w-full h-[20px]" />
                </TableCell>
                <TableCell className="p-3">
                  <Skeleton className="rounded-[5px] w-full h-[20px]" />
                </TableCell>
                <TableCell className="p-3">
                  <Skeleton className="rounded-[5px] w-full h-[20px]" />
                </TableCell>
                <TableCell className="p-3 flex items-center justify-end gap-3">
                  <Skeleton className="rounded-[5px] w-[150px] h-[40px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="lg:hidden block mt-5">
          <div className="flex flex-col">
            {[new Array(10)].map((item, index) => (
              <div
                key={index}
                className={
                  'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                }
              >
                <div className="flex items-center justify-between gap-3 mb-[20px]">
                  <div className="flex items-center justify-start gap-[10px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="DocumentText"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        نوع خدمات :
                      </span>
                      <Skeleton className="rounded-[5px] w-[100px] h-[20px]" />
                    </div>
                  </div>
                  <Skeleton className="rounded-[5px] w-[150px] h-[40px]" />
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Moneys"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                      مبلغ صورتحساب :
                    </span>
                    <Skeleton className="rounded-[5px] w-[100px] h-[20px]" />
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Calendar"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                      تاریخ و زمان صدور :
                    </span>
                    <Skeleton className="rounded-[5px] w-[100px] h-[20px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CustomPagination count={12} loading />
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={cn(
          'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:border border-black/10',
          data.length === 0
            ? 'lg:h-[500px] h-[calc(100dvh-20dvh)] flex items-center justify-center lg:p-10 p-6'
            : '',
          className,
        )}
      >
        <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
          <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
            مشتری گرامی در این لیست شما دسترسی به تمام فاکتور ها دارید.
          </span>
          <CustomPagination
            count={12}
          // onChange={(index) => console.log(index)}
          />
        </div>
        <Table dir="rtl" className="border-none lg:table hidden">
          <TableHeader className="bg-gray-100 border-y border-y-black/10">
            <TableRow className="border-none">
              <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                ردیف
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                نوع خدمات
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                مبلغ صورتحساب
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                تاریخ
              </TableHead>
              <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className={cn(
                  'bg-white hover:bg-white',
                  index + 1 !== data.length
                    ? 'border-b border-b-black/10'
                    : 'border-b-0',
                )}
              >
                <TableCell className="p-3 w-[30px]">
                  <div className="rounded-[5px] bg-gray-100 flex items-center justify-center h-[40px] w-full">
                    <span className="font-normal text-[12px] text-black block text-num-en">
                      {handleZeroBeforeNumber(index + 1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {item.service_type}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {`${numberSeparation(item.amount)} تومان`}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {item.date}
                  </span>
                </TableCell>
                <TableCell className="p-3 flex items-center justify-end gap-3">
                  <div className="w-[150px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500 bg-white border border-black/20 rounded-md text-black">
                    <span className="text-xs text-current font-medium">
                      {item.status_display}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="lg:hidden block mt-5">
          <div className="flex flex-col">
            {data.map((item, index) => (
              <div
                key={index}
                className={
                  'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                }
              >
                <div className="flex items-center justify-between gap-3 mb-[20px]">
                  <div className="flex items-center justify-start gap-[10px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="DocumentText"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        نوع خدمات :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {item.service_type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-[10px]">
                    <div
                      className={
                        'h-[40px] flex items-center justify-center bg-white border border-black/20 rounded-[7px] text-black px-[20px]'
                      }
                    >
                      <span className="text-[10px] text-current font-medium w-full text-right block truncate">
                        {item.status_display}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Moneys"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                      مبلغ صورتحساب :
                    </span>
                    <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.amount)} تومان`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Calendar"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                      تاریخ و زمان صدور :
                    </span>
                    <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CustomPagination count={12} />
        </div>
      </section>
    );
  }
}
