// Importing part
import { ReactNode } from 'react';
import Link from 'next/link';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { HotelAcceptSectionPropsType } from '@/types/dashboard/component';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { cn } from '@/utils/utils';
import { handleZeroBeforeNumber } from '@/utils/string';
import moment from 'jalali-moment';

// Creatgina and exporting HotelAcceptSection as deafult
export default function HotelAcceptSection({
  className,
  data,
}: HotelAcceptSectionPropsType): ReactNode {
  // Returning JSX
  return (
    <section className={className}>
      <div className="flex items-center justify-between gap-4 mb-5 lg:w-auto w-full">
        <div className="flex items-center justify-start gap-[10px]">
          <div className="h-[40px] w-[30px] rounded-[5px] bg-gray-100 lg:hidden flex items-center justify-center shrink-0">
            <span className="font-bold text-[12px] text-black block">01</span>
          </div>
          <span className="truncate text-right w-full lg:font-bold font-semibold lg:text-cs85 text-[12px] text-black">
            تائيدیه هتل اسپیناس پالاس (تهران)
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 shrink-0">
          <button className="lg:h-10 h-[40px] lg:px-3 px-[22px] border border-green-500 bg-[#e3ffed] rounded-[7px] transition-all duration-500 lg:hover:bg-green-200 text-[#178941] lg:text-cs75 text-[12px] font-semibold">
            دانلود
          </button>
          <Link
            href="/dashboard/reservations"
            className="lg:flex hidden items-center h-10 justify-center gap-2 rounded-md bg-cs-red/10 hover:bg-cs-red/15 transition-all duration-500 text-cs-red px-3"
          >
            <IconsaxIcons
              color="currentColor"
              name="LogoutCurve"
              className="shrink-0 w-4 h-4 text-current"
            />
            <span className="text-current text-cs75 font-medium truncate block text-right">
              بازگشت به صفحه اصلی
            </span>
          </Link>
        </div>
      </div>
      <div className="border border-black/10 bg-white rounded-lg overflow-hidden lg:block hidden">
        <Table dir="rtl">
          <TableHeader className="bg-[#f8f8f8] border-b border-b-black/10">
            <TableRow className="border-none">
              <TableHead className="text-right p-3 w-8 truncate text-xs font-semibold text-[#515a6a]">
                ردیف
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                رزرو کننده
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                تاریخ رزرو
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                کد پیگیری
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                شماره تماس
              </TableHead>
              <TableHead className="text-right p-3 truncate text-xs font-semibold text-[#515a6a]">
                تاریخ ورود و خروج
              </TableHead>
              <TableHead className="p-3 w-[500px]" />
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
                  <div className="rounded-[5px] bg-[#f8f8f8] flex items-center justify-center h-[40px] w-full">
                    <span className="font-normal text-[12px] text-black block text-num-en">
                      {handleZeroBeforeNumber(index + 1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                    {item.reserver}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                    {moment(item.createdAt)
                      .locale('fa')
                      .format('jYYYY/jMM/jDD')}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                    {item.codePeigiri}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                    {item.phoneNumber}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-semibold text-[#2c2c2c] truncate block text-right">
                    {`${moment(item.enterAt).locale('fa').format('YYYY/MM/DD')} - ${item.exitAt ? moment(item.exitAt).locale('fa').format('YYYY/MM/DD') : 'و/ن'}`}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="lg:hidden flex flex-col gap-[25px]">
        {data.map((item, index) => (
          <div key={index} className="lg:hidden flex flex-col gap-[13px]">
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons name="User" className="h-[17px] w-[17px]" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  رزرو کننده
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {item.reserver}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="CalendarTick"
                  className="h-[17px] w-[17px]"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  تاریخ رزرو
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {moment(item.createdAt).locale('fa').format('jYYYY/jMM/jDD')}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons name="HashtagUp" className="h-[17px] w-[17px]" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  کد پیگیری
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {item.codePeigiri}
                </span>
              </div>
            </div>
            <Link
              href={`tel:${item.phoneNumber}`}
              className="flex items-center justify-start gap-[10px]"
            >
              <div className="h-[43px] w-[43px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="CallCalling"
                  className="h-[17px] w-[17px]"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  شماره تماس
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {item.phoneNumber}
                </span>
              </div>
            </Link>
            <div className="flex items-center justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons name="Calendar" className="h-[17px] w-[17px]" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  تاریخ ورود و خروج
                </span>
                <span className="text-[10px] font-semibold text-[#2c2c2c] truncate block text-right">
                  {`${moment(item.enterAt).locale('fa').format('YYYY/MM/DD')} - ${item.exitAt ? moment(item.exitAt).locale('fa').format('YYYY/MM/DD') : 'و/ن'}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
