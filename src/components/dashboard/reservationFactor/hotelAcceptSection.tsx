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
      <div className="flex lg:flex-row flex-col items-center justify-between gap-4 mb-5 lg:w-auto w-full">
        <span className="truncate lg:text-right text-center w-full font-bold lg:text-cs85 text-cs75 text-black">
          تائيدیه هتل اسپیناس پالاس (تهران)
        </span>
        <div className="flex items-center justify-between gap-2 lg:w-auto w-full">
          <button className="h-10 lg:w-auto w-[50%] px-3 border border-green-500 bg-green-100 rounded-md transition-all duration-500 hover:bg-green-200 text-green-600 text-cs75 font-normal">
            دانلود
          </button>
          <Link
            href="/dashboard/reservation"
            className="flex lg:w-auto w-[50%] items-center h-10 justify-center gap-2 rounded-md bg-cs-red/10 hover:bg-cs-red/15 transition-all duration-500 text-cs-red px-3"
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
      <div className="border border-black/10 bg-white rounded-lg overflow-hidden">
        <Table dir="rtl">
          <TableHeader className="bg-gray-100 border-b border-b-black/10">
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
                  <div className="rounded-[5px] bg-gray-100 flex items-center justify-center h-[40px] w-full">
                    <span className="font-normal text-[12px] text-black block">
                      {handleZeroBeforeNumber(index + 1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {item.reserver}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {moment(item.createdAt).locale('fa').format('YYYY/MM/DD')}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {item.codePeigiri}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {item.phoneNumber}
                  </span>
                </TableCell>
                <TableCell className="p-3">
                  <span className="text-xs font-medium text-gray-600 truncate block text-right">
                    {`${moment(item.enterAt).locale('fa').format('YYYY/MM/DD')} - ${item.exitAt ? moment(item.exitAt).locale('fa').format('YYYY/MM/DD') : 'و/ن'}`}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
