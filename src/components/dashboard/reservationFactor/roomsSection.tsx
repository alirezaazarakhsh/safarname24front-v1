// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { RoomsSectionPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { handleZeroBeforeNumber } from '@/utils/string';

// Creating and exporting RoomsSection component as default
export default function RoomsSection({
  data,
  className,
}: RoomsSectionPropsType): ReactNode {
  // Returning JSX
  return (
    <section className={cn('flex flex-col lg:gap-5 gap-[25px]', className)}>
      {data.map((item, index) => (
        <div key={index}>
          <span className="truncate block text-right lg:mb-5 mb-[25px] w-full font-bold text-cs75 text-black">{`اتاق ${index + 1} - تعداد مسافر (${item.passenger.length + 1})`}</span>
          <div className="border border-black/10 bg-white rounded-lg overflow-hidden lg:mb-5 mb-[25px]">
            <Table dir="rtl">
              <TableHeader className="bg-gray-100 border-b border-b-black/10">
                <TableRow className="border-none">
                  <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                    ردیف
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                    نام هتل / اتاق
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                    مدت اقامت
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                    وعده غذایی
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                    نیم شارژ ورود
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                    نیم شارژ خروج
                  </TableHead>
                  <TableHead className="p-3 w-[500px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={index} className={'bg-white hover:bg-white'}>
                  <TableCell className="p-3 w-[30px]">
                    <div className="rounded-[5px] bg-gray-100 flex items-center justify-center h-[40px] w-full">
                      <span className="font-normal text-[12px] text-black block">
                        {handleZeroBeforeNumber(index + 1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.info.hotelName}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${item.info.timeSpan} شب`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.info.meals}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.info.enteranceHalfCharge ? 'دارد' : 'ندارد'}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.info.exitHalfCharge ? 'دارد' : 'ندارد'}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-start gap-2 flex-wrap ">
            <div className="px-4 rounded-lg bg-gray-100 border border-black/10 h-10 flex items-center justify-center">
              <span className="text-cs75 font-medium text-black">{`نفر اصلی : ${item.info.reserver}`}</span>
            </div>
            {item.passenger.map((passenger, passengerIndex) => (
              <div
                className="px-4 rounded-lg bg-gray-100 border border-black/10 h-10 flex items-center justify-center"
                key={passengerIndex}
              >
                <span className="text-cs75 font-medium text-black">{`مسافر : ${passenger}`}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
