// Forcing next.js to render this component as client side component
'use client';

// Importing part
import moment from 'jalali-moment';
import { FinancialFatorsDashboardTablePropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { handleZeroBeforeNumber } from '@/utils/string';
import Link from 'next/link';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Loading from '@/components/dashboard/ui/loading';
import Image from 'next/image';
import EmptyImage from '../../../../public/image/empty.png';
import { numberSeparation } from '@/utils';

// Creating and exporting FactorsTable component as default
export default function FactorsTable({
  className,
  data,
}: FinancialFatorsDashboardTablePropsType): ReactNode {
  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:border border-black/10',
        data.length === 0
          ? 'lg:h-[500px] h-[calc(100dvh-20dvh)] flex items-center justify-center lg:p-10 p-6'
          : '',
        className,
      )}
    >
      {data.length === 0 ? (
        <div>
          <Image
            alt="هیچ لیست رزروی فعلا ندارید!"
            src={EmptyImage.src}
            width={500}
            height={500}
            className="h-auto lg:w-[250px] w-[200px] aspect-square block mb-4 mx-auto"
          />
          <span className="block text-center w-full text-black lg:text-cs95 text-[12px] lg:mb-2 mb-3 font-bold">
            هیچ لیست رزروی فعلا ندارید!
          </span>
          <span className="block text-center w-full lg:text-black text-gray-500 lg:text-cs09 text-[10px] font-normal lg:mb-0 mb-6">
            مشتری گرامی برای ثبت رزرو هتل میتوانید از دکمه بالا اقدام نمایید از
            همراهی شما متشکریم.
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
          <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
            <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
              مشتری گرامی در این لیست شما دسترسی به تمام فاکتور ها دارید.
            </span>
            <CustomPagination
              count={12}
              // onChange={(index) => console.log(index)}
            />
          </div>
          <Table dir="rtl" className="border-none lg:table hidden">
            <TableHeader className="bg-gray-100 border-y border-y-black/10">
              <TableRow className="border-none">
                <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                  ردیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  نوع خدمات
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  مبلغ صورتحساب
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  تاریخ و زمان صدور
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
                      {item.type === 'cashOut'
                        ? 'برداشت وجه'
                        : item.type === 'cartToCart'
                          ? 'کارت به کارت'
                          : 'افزایش کیف پول'}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.amount)} تومان`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {moment(item.createdAt)
                        .locale('fa')
                        .format('jYYYY/jMM/jDD A - HH:mm')}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <div className="flex items-center justify-start gap-2">
                      <div
                        className="w-2 h-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            item.status === 'unsuccessfull'
                              ? '#F30F26'
                              : '#35A346',
                        }}
                      />
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.status === 'successfull' &&
                        item.type === 'cashOut'
                          ? 'انجام شده'
                          : item.status === 'successfull' &&
                              item.type === 'cartToCart'
                            ? 'تایید شده'
                            : item.status === 'successfull' &&
                                item.type === 'add'
                              ? 'پرداخت شده'
                              : item.status === 'unsuccessfull'
                                ? 'لغو شده'
                                : 'لغو شده'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    {item.status === 'successfull' ? (
                      <Link
                        href={`/dashboard/financial/factors/${item.id}`}
                        className="w-[125px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500 bg-white border border-black/20 rounded-md text-black hover:bg-gray-100"
                      >
                        <IconsaxIcons name="Eye" className="w-3 h-3 shrink-0" />
                        <span className="text-xs text-current font-medium">
                          مشاهده فاکتور
                        </span>
                      </Link>
                    ) : (
                      <div className="w-[125px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500 bg-white border border-black/20 rounded-md text-black">
                        <span className="text-xs text-current font-medium">
                          عملیات لغو شد!
                        </span>
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
                      <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                        <IconsaxIcons
                          name="DocumentText"
                          className="w-[20px] h-[20px] text-black"
                        />
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                          نوع خدمات :
                        </span>
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.type === 'cashOut'
                            ? 'برداشت وجه'
                            : item.type === 'cartToCart'
                              ? 'کارت به کارت'
                              : 'افزایش کیف پول'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[10px]">
                      {item.status === 'successfull' ? (
                        <Link
                          href={`/dashboard/financial/factors/${item.id}`}
                          className="h-[40px] px-[10px] flex gap-[10px] items-center justify-center bg-white border border-black/20 rounded-[7px] text-black"
                        >
                          <span className="text-[10px] text-current font-medium w-full text-right block truncate">
                            مشاهده فاکتور
                          </span>
                          <IconsaxIcons
                            name="Eye"
                            color="currentColor"
                            className="w-[17px] h-[17px]"
                          />
                        </Link>
                      ) : (
                        <div
                          className={
                            'h-[40px] flex items-center justify-center bg-white border border-black/20 rounded-[7px] text-black px-[20px]'
                          }
                        >
                          <span className="text-[10px] text-current font-medium w-full text-right block truncate">
                            عملیات لغو شد!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Moneys"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        مبلغ صورتحساب :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {`${numberSeparation(item.amount)} تومان`}
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
                        تاریخ و زمان صدور :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {moment(item.createdAt)
                          .locale('fa')
                          .format('jYYYY/jMM/jDD A - HH:mm')}
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
                              item.status === 'unsuccessfull'
                                ? '#F30F26'
                                : '#35A346',
                          }}
                        />
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.status === 'successfull' &&
                          item.type === 'cashOut'
                            ? 'انجام شده'
                            : item.status === 'successfull' &&
                                item.type === 'cartToCart'
                              ? 'تایید شده'
                              : item.status === 'successfull' &&
                                  item.type === 'add'
                                ? 'پرداخت شده'
                                : item.status === 'unsuccessfull'
                                  ? 'لغو شده'
                                  : 'لغو شده'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CustomPagination count={12} />
          </div>
        </>
      )}
    </section>
  );
}
