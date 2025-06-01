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
import IconsaxIcons from '@/components/icons/iconsaxIcons';

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
          <span className="truncate lg:block hidden text-right lg:mb-5 mb-[25px] w-full text-cs75 font-semibold text-[#2c2c2c]">{`اتاق ${index + 1} - تعداد مسافر (${item.passenger.length + 1})`}</span>
          <div className="border border-black/10 bg-white rounded-lg overflow-hidden lg:mb-5 mb-[25px] lg:block hidden">
            <Table dir="rtl">
              <TableHeader className="bg-[#f8f8f8] border-b border-b-black/10">
                <TableRow className="border-none">
                  <TableHead className="text-right p-3 w-8 truncate text-xs font-semibold text-[#515a6a]">
                    ردیف
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                    نام هتل / اتاق
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                    مدت اقامت
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                    وعده غذایی
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                    نیم شارژ ورود
                  </TableHead>
                  <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                    نیم شارژ خروج
                  </TableHead>
                  <TableHead className="p-3 w-[500px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={index} className={'bg-white hover:bg-white'}>
                  <TableCell className="p-3 w-[30px]">
                    <div className="rounded-[5px] bg-[#f8f8f8] flex items-center justify-center h-[40px] w-full">
                      <span className="font-normal text-[12px] text-black block text-num-en">
                        {handleZeroBeforeNumber(index + 1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                      {item.info.hotelName}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                      {`${item.info.timeSpan} شب`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                      {item.info.meals}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                      {item.info.enteranceHalfCharge ? 'دارد' : 'ندارد'}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                      {item.info.exitHalfCharge ? 'دارد' : 'ندارد'}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="lg:hidden flex flex-col gap-[10px]">
            <div className="lg:hidden flex flex-col gap-[13px]">
              <div className="flex items-center justify-start gap-[10px]">
                <div className="h-[40px] w-[30px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="font-bold text-[12px] text-black block text-num-en">
                    {handleZeroBeforeNumber(index + 1)}
                  </span>
                </div>
                <span className="text-[12px] font-bold text-black truncate block text-right">
                  {`اتاق ${index + 1} - تعداد مسافر (${item.passenger.length + 1})`}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="Bank"
                  className="w-[17px] h-[17px] text-black"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  نام هتل / اتاق
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {item.info.hotelName}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="Calendar"
                  className="w-[17px] h-[17px] text-black"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  مدت اقامت
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {`${item.info.timeSpan} شب`}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="Coffee"
                  className="w-[17px] h-[17px] text-black"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  وعده غذایی
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {item.info.meals}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="ReceiptItem"
                  className="w-[17px] h-[17px] text-black"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  نیم شارژ ورود
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {item.info.enteranceHalfCharge ? 'دارد' : 'ندارد'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="ReceiptItem"
                  className="w-[17px] h-[17px] text-black"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  نیم شارژ خروج
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {item.info.exitHalfCharge ? 'دارد' : 'ندارد'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-center justify-start lg:gap-2 gap-[12px] lg:flex-wrap w-full lg:mt-0 mt-[20px]">
            <div className="lg:px-4 lg:w-auto w-full px-[24px] lg:rounded-lg rounded-[10px] bg-[#f8f8f8] border border-black/10 lg:h-10 h-[50px] flex items-center lg:justify-center justify-start">
              <span className="lg:text-cs75 text-[12px] font-semibold text-[#2c2c2c]">{`نفر اصلی : ${item.info.reserver}`}</span>
            </div>
            {item.passenger.map((passenger, passengerIndex) => (
              <div
                key={passengerIndex}
                className="lg:px-4 px-[24px] lg:w-auto w-full lg:rounded-lg rounded-[10px]  bg-[#f8f8f8] border border-black/10 lg:h-10 h-[50px] flex items-center lg:justify-center justify-start"
              >
                <span className="lg:text-cs75 text-[12px] font-semibold text-[#2c2c2c]">{`مسافر : ${passenger}`}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
