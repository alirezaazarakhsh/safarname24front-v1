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
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-[10px] lg:border border-black/10 lg:block hidden',
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
                  تاریخ
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  نوع پرداخت
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  وضعیت
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
                      <span className="font-normal text-[12px] text-black block text-num-en">
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
                        .format('jYYYY/jMM/jDD')}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.paymentType === 'card-to-card'
                        ? 'کارت به کارت'
                        : 'درگاه پرداخت'}
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
                  <TableCell className="p-3 flex items-center justify-end gap-3 relative">
                    {item.status === 'successfull' ? (
                      <div className="px-6 h-[40px] rounded-md border border-green-600 bg-green-50 text-green-600 font-medium text-xs flex items-center justify-center peer transition-all duration-500 hover:bg-green-100">
                        پرداخت شده
                      </div>
                    ) : (
                      <>
                        <div className="px-6 h-[40px] rounded-md border border-red-600 bg-red-50 text-red-600 font-medium text-xs flex items-center justify-center peer transition-all duration-500 hover:bg-red-100">
                          عدم پرداخت
                        </div>
                        <div className="p-2 rounded-md bg-[#FFE9EB] text-cs-red absolute bottom-full left-[20px] w-[200px] transition-all duration-500 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible">
                          <p className="text-right text-current font-light text-[9px]">
                            مشتری گرامی پرداخت شما به دلیل مشکلات فنی به وجود
                            آمده موفقیت آمیز نبود بنابراین فاکتور برای شما صادر
                            نخواهد شد.
                          </p>
                          <div className="absolute top-full -translate-y-[50%] left-[20px] w-[15px] h-[15px] bg-[#FFE9EB] rotate-45" />
                        </div>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </section>
  );
}
