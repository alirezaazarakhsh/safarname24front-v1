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
import { digitsEnToFa } from '@persian-tools/persian-tools';

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
        'bg-white lg:p-[22px] p-[15px] border border-black/10 w-full lg:rounded-[12px] rounded-[14px]',
        className,
      )}
    >
      <div className="flex items-center justify-between lg:gap-5 gap-3 lg:mb-5 mb-[25px]">
        <span className="block truncate text-right w-full font-bold lg:text-cs85 text-[12px] text-black">
          لیست رزرو های اخیر
        </span>
        <Link
          href="/dashboard/reservations"
          className="lg:rounded-lg rounded-[6px] lg:font-normal font-medium lg:w-[125px] w-[100px] lg:text-cs08 text-[10px] text-white bg-black lg:px-8 px-[12px] lg:py-3 py-0 lg:h-auto h-[33px] flex items-center justify-center whitespace-nowrap shrink-0"
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
                  <span className="font-normal text-[12px] text-black block text-num-en">
                    {digitsEnToFa(handleZeroBeforeNumber(index + 1))}
                  </span>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  'px-3 overflow-hidden w-[200px] min-w-[200px] max-w-[200px]',
                  index === 0 ? 'pt-0 pb-5' : 'py-5',
                )}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <ICBank className="w-5 h-5 text-black" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <span className="text-cs75 font-bold text-black truncate block text-right mb-1">
                      نام هتل :
                    </span>
                    <span className="text-cs75 font-semibold text-gray-600 truncate block text-right">
                      {item.hotelName}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  'px-3 w-[200px] min-w-[200px] max-w-[200px]',
                  index === 0 ? 'pt-0 pb-5' : 'py-5',
                )}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <ICMoneyTick className="w-5 h-5 text-black" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <span className="text-cs75 font-bold text-black truncate block text-right mb-1">
                      مبلغ :
                    </span>
                    <span className="text-cs75 font-semibold text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.price)} تومان`}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  'px-3 w-[200px] min-w-[200px] max-w-[200px]',
                  index === 0 ? 'pt-0 pb-5' : 'py-5',
                )}
              >
                <div className="flex items-center justify-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
                    <ICStatus className="w-5 h-5 text-black" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <span className="text-cs75 font-bold text-black truncate block text-right mb-1">
                      وضعیت :
                    </span>
                    <span className="text-cs75 font-semibold text-gray-600 truncate block text-right">
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
                    <span className="font-semibold text-cs07 text-gray-600 block truncate text-center">
                      {moment().locale('fa').format('YYYY/MM/DD')}
                    </span>
                  </div>
                  {item.status === 'accepted' ? (
                    <Link
                      href={`/dashboard/reservations/${item.id}`}
                      className="bg-green-100/50 h-10 w-[125px] transition-all duration-500 hover:bg-green-100 px-5 rounded-md flex items-center justify-center gap-2"
                    >
                      <span className="font-semibold text-cs07 text-green-500 block truncate text-right">
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
                      <span className="font-semibold text-cs07 text-current block truncate text-right whitespace-nowrap">
                        {item.status === 'cancled'
                          ? 'لغو شده'
                          : item.status === 'pending'
                            ? 'در انتظار پرداخت'
                            : 'پرداخت موفقیت آمیز'}
                      </span>
                    </div>
                  )}
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
                : 'mb-[20px] border-b-[1.3px] border-b-black/10 pb-[20px]',
            )}
          >
            <div className="flex items-center justify-between gap-3 mb-[20px]">
              <div className="flex items-center justify-start gap-[10px]">
                <div className="h-[40px] w-[30px] rounded-[5px] bg-gray-100 flex items-center justify-center">
                  <span className="font-bold text-[12px] text-black block text-num-en">
                    {digitsEnToFa(handleZeroBeforeNumber(index + 1))}
                  </span>
                </div>
                <div className="bg-gray-100 h-[40px] w-[100px] rounded-[6px] flex items-center justify-center">
                  <span className="font-bold lg:text-cs07 text-[10px] text-gray-600 block truncate text-center">
                    {moment().locale('fa').format('YYYY/MM/DD')}
                  </span>
                </div>
              </div>
              {item.status === 'accepted' ? (
                <Link
                  href={`/dashboard/reservation/${item.id}`}
                  className="bg-green-100/50 hover:bg-green-100 text-green-500 w-[100px] h-[40px] box-border transition-all duration-500 px-[12px] rounded-[6px] flex items-center justify-center"
                >
                  <span className="font-medium text-cs07 text-current block truncate text-right whitespace-nowrap">
                    مشاهده تاییده
                  </span>
                </Link>
              ) : (
                <div
                  className={cn(
                    'w-[100px] h-[40px] box-border transition-all duration-500 px-[12px] rounded-[6px] flex items-center justify-center',
                    item.status === 'cancled'
                      ? 'bg-red-100/50 text-red-500'
                      : 'bg-gray-100/50 text-gray-500',
                  )}
                >
                  <span className="font-medium text-cs07 text-current block truncate text-right whitespace-nowrap">
                    {item.status === 'cancled'
                      ? 'لغو شده'
                      : item.status === 'pending'
                        ? 'در انتظار پرداخت'
                        : 'پرداخت موفقیت آمیز'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-start gap-[10px] mb-[25px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <ICBank className="w-[20px] h-[20px] text-black" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  نام هتل :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {item.hotelName}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px] mb-[25px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <ICMoneyTick className="w-[20px] h-[20px] text-black" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  مبلغ :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {numberSeparation(item.price)} تومان
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
                  {item.status === 'cancled'
                    ? 'سیستم پرداخت لغو شد'
                    : item.status === 'pending'
                      ? 'در حال پرداخت وجه'
                      : 'پرداخت موفقیت آمیز'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
