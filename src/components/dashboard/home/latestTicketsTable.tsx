// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import moment from 'jalali-moment';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { ICHashtagUp } from '@/components/icons/ICHashtagUp';
import { ICDocumentText } from '@/components/icons/ICDocumentText';
import { ICStatus } from '@/components/icons/ICStatus';
import { ICChevronBottom } from '@/components/icons/ICChevronBottom';
import { LatestTicketsTableProps } from '@/types/dashboard/component';
import { handleZeroBeforeNumber } from '@/utils/string';
import { ICCup } from '@/components/icons/ICCup';

// Defining some fake data to render
const data: {
  id: number;
  title: string;
  status: 'answered' | 'pending' | 'opened' | 'closed';
  createdAt: string;
}[] = [
  {
    id: 12345678,
    title: 'عدم فعالسازی سرویس',
    status: 'answered',
    createdAt: new Date().toISOString(),
  },
  {
    id: 12345678,
    title: 'درخواست فعالسازی',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 12345678,
    title: 'مشکل در رزرواسیون',
    status: 'opened',
    createdAt: new Date().toISOString(),
  },
  {
    id: 12345678,
    title: 'عدم فعالسازی سرویس',
    status: 'closed',
    createdAt: new Date().toISOString(),
  },
];

// Creating and exporting LatestTicketsTable component as default
export default function LatestTicketsTable({
  className,
}: LatestTicketsTableProps): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white lg:py-5 py-[15px] lg:px-3 px-[13px] border border-black/10 w-full lg:rounded-lg rounded-[14px]',
        className,
      )}
    >
      <div className="flex items-center justify-between lg:gap-5 gap-3 lg:mb-5 mb-[25px]">
        <span className="block truncate text-right w-full font-bold lg:text-cs85 text-[12px] text-black">
          لیست تیکت های اخیر
        </span>
        <Link
          href="/dashboard/tickets"
          className="lg:rounded-lg rounded-[6px] lg:font-normal font-medium lg:w-[125px] w-[94px] lg:text-cs08 text-[10px] text-white bg-black lg:px-8 px-[12px] lg:py-3 py-0 lg:h-auto h-[33px] flex items-center justify-center whitespace-nowrap shrink-0"
        >
          مشاهده همه
        </Link>
      </div>
      <Table dir="rtl" className="lg:table hidden">
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              className="hover:bg-white border-black/10 px-0"
              key={index}
            >
              <TableCell
                className={cn('px-0 w-8', index === 0 ? 'pt-0 pb-5' : 'py-5')}
              >
                <div className="h-12 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                  <span className="font-normal text-cs06 text-black block">
                    {handleZeroBeforeNumber(index + 1)}
                  </span>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  'px-3 overflow-hidden',
                  index === 0 ? 'pt-0 pb-5' : 'py-5',
                )}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <ICCup className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
                      شناسه :
                    </span>
                    <span className="text-cs75 font-normal text-gray-600 truncate block text-right">
                      {`شماره پیگیری (${item.id})`}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={cn('px-3', index === 0 ? 'pt-0 pb-5' : 'py-5')}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <ICDocumentText className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
                      عنوان :
                    </span>
                    <span className="text-cs75 font-normal text-gray-600 truncate block text-right">
                      {item.title}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={cn('px-3', index === 0 ? 'pt-0 pb-5' : 'py-5')}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <ICStatus className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
                      وضعیت :
                    </span>
                    <span className="text-cs75 font-normal text-gray-600 truncate block text-right">
                      {item.status === 'answered'
                        ? 'تیکت پاسخ داده شد'
                        : item.status === 'pending'
                          ? 'در حال بررسی '
                          : item.status === 'opened'
                            ? 'تیکت باز شده'
                            : 'تیکت بسته شده'}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  'px-0 w-[300px]',
                  index === 0 ? 'pt-0 pb-5' : 'py-5',
                )}
              >
                <div className="flex justify-end gap-3">
                  <div className="bg-gray-100 h-10 px-5 rounded-md flex items-center justify-center">
                    <span className="font-normal text-cs07 text-gray-600 block truncate text-center">
                      {moment().locale('fa').format('YYYY/MM/DD')}
                    </span>
                  </div>
                  <Link
                    href={`/dashboard/tickets/${item.id}`}
                    className="bg-white border border-gray-300 w-[125px] h-10 transition-all duration-500 hover:bg-gray-100 px-5 rounded-md flex items-center justify-center gap-2"
                  >
                    <span className="font-normal text-cs07 text-gray-600 block truncate text-right">
                      ورود به تیکت
                    </span>
                    <ICChevronBottom className="w-2 h-2 text-gray-600 rotate-90 shrink-0" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="lg:hidden flex flex-col">
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              index + 1 === data.length
                ? ''
                : 'mb-[20px] border-b border-b-black/10 pb-[20px]',
            )}
          >
            <div className="flex items-center justify-between gap-3 mb-[20px]">
              <div className="flex items-center justify-start gap-[10px]">
                <div className="h-[40px] w-[30px] rounded-[5px] bg-gray-100 flex items-center justify-center">
                  <span className="font-bold text-[12px] text-black block">
                    {handleZeroBeforeNumber(index + 1)}
                  </span>
                </div>
                <div className="bg-gray-100 h-[40px] px-[12px] rounded-[6px] flex items-center justify-center">
                  <span className="font-bold lg:text-cs07 text-[10px] text-gray-600 block truncate text-center">
                    {moment().locale('fa').format('YYYY/MM/DD')}
                  </span>
                </div>
              </div>
              <Link
                href={`/dashboard/tickets/${item.id}`}
                className="bg-white border border-gray-300 w-[94px] h-[40px] box-border transition-all duration-500 hover:bg-gray-100 px-[12px] rounded-[6px] flex items-center justify-center gap-[4px]"
              >
                <span className="font-normal text-[10px] text-gray-600 block truncate text-right">
                  ورود به تیکت
                </span>
                <ICChevronBottom className="w-[10px] h-[10px] text-gray-600 rotate-90 shrink-0" />
              </Link>
            </div>
            <div className="flex items-center justify-start gap-[10px] mb-[25px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <ICHashtagUp className="w-[20px] h-[20px] text-black" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  شناسه :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {`شماره پیگیری (${item.id})`}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px] mb-[25px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <ICDocumentText className="w-[20px] h-[20px] text-black" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  عنوان :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {item.title}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <ICStatus className="w-[20px] h-[20px] text-black" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  وضعیت :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {item.status === 'answered'
                    ? 'تیکت پاسخ داده شد'
                    : item.status === 'pending'
                      ? 'در حال بررسی '
                      : item.status === 'opened'
                        ? 'تیکت باز شده'
                        : 'تیکت بسته شده'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
