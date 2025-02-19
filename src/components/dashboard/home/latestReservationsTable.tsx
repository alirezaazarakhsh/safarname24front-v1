// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import moment from 'jalali-moment';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { ICStatus } from '@/components/icons/ICStatus';
import { numberSeparation } from '@/utils';
import { LatestReservationsTableProps } from '@/types/dashboard/component';
import { handleZeroBeforeNumber } from '@/utils/string';
import { ICBank } from '@/components/icons/ICBank';
import { ICMoneyTick } from '@/components/icons/ICMoneyTick';

// Defining some fake data to render
const data: {
  id: number;
  hotelName: string;
  price: number;
  status: 'accepted' | 'cancled' | 'pending';
  createdAt: string;
}[] = [
  {
    id: 1,
    hotelName: 'اسپیناس پالاس تهران',
    price: 18000000,
    status: 'accepted',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    hotelName: 'پارسیان آزادی تهران',
    price: 18000000,
    status: 'cancled',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    hotelName: 'شاه عباس کوثر اصفهانی',
    price: 18000000,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

// Creating and exporting LatestReservationsTable component as default
export default function LatestReservationsTable({
  className,
}: LatestReservationsTableProps): ReactNode {
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
          لیست رزرو های اخیر
        </span>
        <Link
          href="/dashboard/reservations"
          className="rounded-lg font-normal text-cs08 text-white bg-black px-8 py-3 w-[125px] block whitespace-nowrap"
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
                    <ICBank className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
                      نام هتل :
                    </span>
                    <span className="text-cs75 font-normal text-gray-600 truncate block text-right">
                      {item.hotelName}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={cn('px-3', index === 0 ? 'pt-0 pb-5' : 'py-5')}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <ICMoneyTick className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
                      مبلغ :
                    </span>
                    <span className="text-cs75 font-normal text-gray-600 truncate block text-right">
                      {numberSeparation(item.price)}
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
                      {item.status === 'accepted'
                        ? 'پرداخت موفقیت آمیز'
                        : item.status === 'cancled'
                          ? 'سیستم پرداخت لغو شد'
                          : 'در حال پرداخت وجه'}
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
                  {item.status === 'accepted' ? (
                    <Link
                      href={`/dashboard/reservation/${item.id}`}
                      className="bg-green-100/50 h-10 w-[125px] transition-all duration-500 hover:bg-green-100 px-5 rounded-md flex items-center justify-center gap-2"
                    >
                      <span className="font-normal text-cs07 text-green-500 block truncate text-right">
                        مشاهده تاییده
                      </span>
                    </Link>
                  ) : (
                    <div
                      className={cn(
                        'h-10 w-[125px] px-5 rounded-md flex items-center justify-center gap-2',
                        item.status === 'cancled'
                          ? 'bg-red-100/50 text-red-500'
                          : 'bg-gray-100/50 text-gray-500',
                      )}
                    >
                      <span className="font-normal text-cs07 text-current block truncate text-right whitespace-nowrap">
                        {item.status === 'pending'
                          ? 'در انتظار پرداخت'
                          : 'لغو شده'}
                      </span>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
