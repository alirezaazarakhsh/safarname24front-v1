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

// Defining some dummy data to render
const data: {
  reserver: string;
  createdAt: string;
  codePeigiri: string;
  phoneNumber: string;
  enterAt: string;
  exitAt: string | null;
}[] = [
  {
    reserver: 'علیرضا آذرخش آلوچه',
    createdAt: new Date().toISOString(),
    codePeigiri: '45HGI13968V',
    phoneNumber: '09912346598',
    enterAt: new Date().toISOString(),
    exitAt: null,
  },
];

// Creatgina and exporting HotelAcceptSection as deafult
export default function HotelAcceptSection({
  className,
}: HotelAcceptSectionPropsType): ReactNode {
  // Returning JSX
  return (
    <section className={className}>
      <div className="flex items-center justify-between gap-4 mb-5">
        <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
          تائيدیه هتل اسپیناس پالاس (تهران)
        </span>
        <div className="flex items-center justify-between gap-2">
          <button className="h-10 px-3 border border-green-500 bg-green-100 rounded-md transition-all duration-500 hover:bg-green-200 text-green-600 text-cs75 font-normal">
            دانلود
          </button>
          <Link
            href="/dashboard/reservation"
            className="flex items-center h-10 justify-center gap-2 rounded-md bg-cs-red/10 hover:bg-cs-red/15 transition-all duration-500 text-cs-red px-3"
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
      <Table
        dir="rtl"
        className="border-none border border-black/10 bg-white rounded-lg overflow-auto scrollbar-hide"
      >
        <TableHeader className="bg-gray-100">
          <TableRow className="border-none">
            <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
              ردیف
            </TableHead>
            <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
              رزرو کننده
            </TableHead>
            <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
              تاریخ رزرو
            </TableHead>
            <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
              کد پیگیری
            </TableHead>
            <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
              شماره تماس
            </TableHead>
            <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
              تاریخ ورود و خروج
            </TableHead>
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
                  <span className="font-normal text-[12px] text-black block">
                    {handleZeroBeforeNumber(index + 1)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="p-3">
                <span className="text-xs font-medium text-gray-600 truncate block text-right">
                  ds
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
