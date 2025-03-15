// Forcing next.js to render this component as client side component
'use client';

// Importing part
import moment from 'jalali-moment';
import { TransactionsTablePropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';
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
import { numberSeparation } from '@/utils';
import CustomPagination from '../../ui/customPagination';
import EmptyImage from '../../../../../public/image/empty-transaction.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Creating and exporting TransactionsTable component as default
export default function TransactionsTable({
  className,
  data,
}: TransactionsTablePropsType): ReactNode {
  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:border border-black/10',
        className,
      )}
    >
      <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
        <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
          لیست تمام تراکنش ها
        </span>
        {data.length !== 0 && (
          <CustomPagination
            count={12}
            // onChange={(index) => console.log(index)}
          />
        )}
      </div>
      {data.length === 0 ? (
        <div className="h-[500px] flex flex-col items-center justify-center">
          <div>
            <Image
              alt="هیچ لیست رزروی فعلا ندارید!"
              src={EmptyImage.src}
              width={500}
              height={500}
              className="h-auto w-auto  aspect-square block mb-4 mx-auto"
            />
          </div>

          <span className="block text-center w-full text-black lg:text-cs95 text-[12px] lg:mb-2 mb-3 font-bold">
            هیچ تراکنش مالی فعلا ندارید!
          </span>
          <Button className="lg:hidden flex items-center justify-center gap-2 mx-auto text-black bg-gray-100 rounded-[7px] p-[14px]">
            <IconsaxIcons
              name="Add"
              className="w-[18px] h-[18px] text-gray-600 shrink-0"
            />
            <span className="block text-right truncate font-normal whitespace-nowrap text-[12px] text-current">
              ثبت رزرو
            </span>
          </Button>
        </div>
      ) : (
        <>
          <Table dir="rtl" className="border-none lg:table hidden">
            <TableHeader className="bg-gray-100 border-y border-y-black/10">
              <TableRow className="border-none">
                <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                  ردیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  کد پیگیری
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  بودجه
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  تاریخ و روز
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  کارت بانکی
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  وضعیت مالی
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
                      <span className="font-normal text-[12px] text-black block">
                        {handleZeroBeforeNumber(index + 1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.codePeigiri}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.price)} تومان`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {moment(item.createdAt)
                        .locale('fa')
                        .format('HH:mm a - jYYYY/jMM/jDD')}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.bank}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <div className="flex items-center justify-start gap-2">
                      <div
                        className="w-2 h-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            item.status === 'unsucessfull'
                              ? '#F30F26'
                              : '#35A346',
                        }}
                      />
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.status === 'successfull'
                          ? 'پرداخت شده'
                          : 'پرداخت ناموفق'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    {item.status === 'successfull' ? (
                      <button className="px-6 h-[40px] rounded-md border border-black/10 bg-white text-black font-medium text-xs transition-all duration-500 hover:bg-black/10">
                        عدم پرداخت
                      </button>
                    ) : (
                      <div className="px-6 h-[40px] rounded-md border border-red-600 bg-red-50 text-red-600 font-medium text-xs flex items-center justify-center">
                        عدم پرداخت
                      </div>
                    )}
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
                      <div className="h-[40px] w-[30px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                        <span className="font-bold text-[12px] text-black block">
                          {handleZeroBeforeNumber(index + 1)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                          کد پیگیری
                        </span>
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          x
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[10px]">
                      <button className="h-[40px] w-[40px] aspect-square rounded-[7px] border border-red-600 bg-red-50 text-red-600 flex items-center justify-center">
                        <IconsaxIcons
                          name="CloseCircle"
                          color="currentColor"
                          className="w-[17px] h-[17px]"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Bank"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        هتل :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        s
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
                        تاریخ ورود و خروج :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        sd
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Profile2User"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        مسافران :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        sd
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Status"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        وضعیت مالی
                      </span>
                      <div className="flex items-center justify-start gap-[10px]">
                        <div
                          className="w-[4px] h-[4px] shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              item.status === 'unsucessfull'
                                ? '#F30F26'
                                : '#35A346',
                          }}
                        />
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          d
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
