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
        'bg-white py-5 px-3 border border-black/10 w-full rounded-lg',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-5 mb-5">
        <span className="block truncate text-right w-full font-bold text-cs85 text-black">
          لیست تیکت های اخیر
        </span>
        <Link
          href="/dashboard/tickets"
          className="rounded-lg font-normal w-[125px] text-cs08 text-white bg-black px-8 py-3 block whitespace-nowrap"
        >
          مشاهده همه
        </Link>
      </div>
      <Table dir="rtl">
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
                    <ICHashtagUp className="w-5 h-5 text-black" />
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
    </div>
  );
}
