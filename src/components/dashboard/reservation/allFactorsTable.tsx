// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { AllFactorsTableComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
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
import Link from 'next/link';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Loading from '@/components/dashboard/ui/loading';
import CanclationReasonDialog from './dialog/canclationReseaonDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { GETReservationItem } from '@/types/dashboard/api/get';
import moment from 'jalali-moment';
import { isOneHourPassed } from '@/utils/date';
import CustomPagination from '../ui/customPagination';

// Creating and exporting AllFactorsTable component as default
export default function AllFactorsTable({
  className,
  data,
  loading,
  activeIndex,
  paginationCount,
  setActiveIndex,
  refetch,
}: AllFactorsTableComponentPropsType): ReactNode {
  // Defining states of component
  const [canclationReasonDialogOpened, setCanclationReasonDialogOpened] =
    useState<boolean>(false);

  const [trackingCode, setTrackingCode] = useState<string | undefined>(
    undefined,
  );

  // Defining a function to return status infos based on given props
  type StatusTypes = GETReservationItem['payment_status'];

  function returnStatus(status: StatusTypes): {
    color: string;
    title: string;
  } {
    return {
      color:
        status === 'unpaid'
          ? '#F30F26'
          : status === 'pending'
            ? '#4B5BCE'
            : status === 'paid'
              ? '#35A346'
              : '#00000',
      title:
        status === 'paid'
          ? 'پرداخت شده'
          : status === 'unpaid'
            ? 'پرداخت نشده'
            : status === 'pending'
              ? 'در حال تایید'
              : 'نا معلوم',
    };
  }

  // Conditional rendering
  if (loading) {
    return (
      <section
        className={cn(
          'lg:bg-white bg-transparent overflow-hidden lg:rounded-[14px] lg:border border-black/10',
          className,
        )}
      >
        <div className="lg:flex hidden items-center justify-between gap-3 p-[23px]">
          <span className="block truncate text-right w-full font-semibold lg:text-cs85 text-black">
            مشتری گرامی در این لیست شما دسترسی به تمام فاکتور ها دارید.
          </span>
          <CustomPagination loading count={12} />
        </div>
        <Table dir="rtl" className="border-none lg:table hidden">
          <TableHeader className="bg-[#f7f7f7] border-y border-y-black/10">
            <TableRow className="border-none">
              <TableHead className="text-right p-[20px] w-[32px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                ردیف
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                کد پیگیری
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                هتل
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                تاریخ ورود و خروج
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                مسافران
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                وضعیت مالی
              </TableHead>
              <TableHead className="w-[30%] text-right truncate text-[12.5px] font-semibold" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...new Array(4)].map((item, index) => (
              <TableRow
                key={index}
                className={
                  data.length !== index + 1
                    ? 'bg-white !border-b border-b-black/10 hover:bg-white'
                    : ''
                }
              >
                <TableCell className="p-[20px] w-[30px]">
                  <Skeleton className="rounded-[5px] h-[40px] w-full" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[60px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[60px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[60px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[60px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <div className="flex items-center justify-start gap-2">
                    <Skeleton className="size-[7px] shrink-0 rounded-full" />
                    <Skeleton className="rounded-[5px] w-[60px] h-[16px]" />
                  </div>
                </TableCell>
                <TableCell className="p-[20px] flex items-center justify-end gap-3">
                  <Skeleton className="rounded-[5px] w-[100px] h-[40px]" />
                  <Skeleton className="rounded-[5px] w-[125px] h-[40px]" />
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
                  'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-[rgba(0,0,0,0.07)] py-3 mb-3'
                }
              >
                <div className="flex items-center justify-between gap-3 mb-[20px]">
                  <div className="flex items-center justify-start gap-[10px]">
                    <Skeleton className="rounded-[5px] size-[40px]" />
                    <div>
                      <Skeleton className="rounded-[5px] w-[50px] h-[16px] mb-1" />
                      <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-[10px]">
                    <Skeleton className="rounded-[5px] w-[40px] h-[40px]" />
                    <Skeleton className="rounded-[5px] w-[100px] h-[40px]" />
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <Skeleton className="rounded-[7px] w-[43px] h-[43px]" />
                  <div>
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px] mb-1" />
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <Skeleton className="rounded-[7px] w-[43px] h-[43px]" />
                  <div>
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px] mb-1" />
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <Skeleton className="rounded-[7px] w-[43px] h-[43px]" />
                  <div>
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px] mb-1" />
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <Skeleton className="rounded-[7px] w-[43px] h-[43px]" />
                  <div>
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px] mb-1" />
                    <div className="flex items-center justify-start gap-[5px]">
                      <Skeleton className="size-[7px] shrink-0 rounded-full" />
                      <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section
        className={cn(
          'lg:bg-white bg-transparent overflow-hidden lg:rounded-[14px] lg:border border-black/10',
          data.length === 0
            ? 'lg:h-[500px] h-[calc(100dvh-20dvh)] flex items-center justify-center lg:p-10 p-6'
            : '',
          className,
        )}
      >
        <CanclationReasonDialog
          isOpened={canclationReasonDialogOpened}
          trackingCode={trackingCode || '-'}
          refetch={refetch}
          closeFn={() => {
            setCanclationReasonDialogOpened(false);
            setTrackingCode(undefined);
          }}
        />
        <div className="lg:flex hidden items-center justify-between gap-3 p-[23px]">
          <span className="block truncate text-right w-full font-semibold lg:text-cs85 text-black">
            مشتری گرامی در این لیست شما دسترسی به تمام فاکتور ها دارید.
          </span>
          <CustomPagination
            count={paginationCount ?? 12}
            activeIndex={activeIndex ?? 0}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <Table dir="rtl" className="border-none lg:table hidden">
          <TableHeader className="bg-[#f7f7f7] border-y border-y-black/10">
            <TableRow className="border-none">
              <TableHead className="text-right p-[20px] w-[32px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                ردیف
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                کد پیگیری
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                هتل
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                تاریخ ورود و خروج
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                مسافران
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-[12.5px] font-semibold text-[#3d4046]">
                وضعیت مالی
              </TableHead>
              <TableHead className="w-[30%] text-right truncate text-[12.5px] font-semibold" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className={
                  data.length !== index + 1
                    ? 'bg-white !border-b border-b-black/10 hover:bg-white'
                    : ''
                }
              >
                <TableCell className="p-[20px] w-[30px]">
                  <div className="rounded-[5px] bg-gray-100 flex items-center justify-center h-[40px] w-full">
                    <span className="font-medium text-[12.5px] text-black block text-num-en">
                      {handleZeroBeforeNumber(index + 1)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-[20px]">
                  <span className="font-medium text-[12.5px] text-gray-600 truncate block text-right">
                    {item.tracking_code}
                  </span>
                </TableCell>
                <TableCell className="p-[20px]">
                  <span className="font-medium text-[12.5px] text-gray-600 truncate block text-right">
                    {item.hotel_name}
                  </span>
                </TableCell>
                <TableCell className="p-[20px]">
                  <span className="font-medium text-[12.5px] text-gray-600 truncate block text-right">
                    {`${moment(item.check_in_date).format('YYYY/MM/DD')} - ${moment(item.check_out_date).format('YYYY/MM/DD')}`}
                  </span>
                </TableCell>
                <TableCell className="p-[20px]">
                  <span className="font-medium text-[12.5px] text-gray-600 truncate block text-right">
                    {item.total_guests}
                  </span>
                </TableCell>
                <TableCell className="p-[20px]">
                  <div className="flex items-center justify-start gap-2">
                    <div
                      className="size-[7px] shrink-0 rounded-full"
                      style={{
                        backgroundColor: returnStatus(item.payment_status)
                          .color,
                      }}
                    />
                    <span className="font-medium text-[12.5px] text-gray-600 truncate block text-right">
                      {returnStatus(item.payment_status).title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-[20px] flex items-center justify-end gap-3">
                  {!isOneHourPassed(item.created_at) && (
                    <button
                      className="px-6 h-[40px] rounded-md border border-cs-red bg-cs-red/5 text-cs-red font-bold text-[12px] transition-all duration-500 hover:bg-cs-red/10"
                      onClick={() => {
                        setCanclationReasonDialogOpened(true);
                        setTrackingCode(item.tracking_code);
                      }}
                    >
                      کنسل
                    </button>
                  )}
                  {item.payment_status === 'paid' ? (
                    <Link
                      href={`/dashboard/${item.tracking_code}`}
                      className="w-[125px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500 bg-white border border-[#d8d8d8] rounded-md text-[#2b2b2b] hover:bg-gray-50"
                    >
                      <IconsaxIcons
                        name="Eye"
                        className="w-[16px] h-[16px] shrink-0"
                        color="currentColor"
                      />
                      <span className="text-[12px] text-current font-bold">
                        مشاهده فاکتور
                      </span>
                    </Link>
                  ) : (
                    <div className="h-[40px] w-[125px] bg-white border border-[#d8d8d8] rounded-md text-black flex items-center justify-center">
                      <Loading />
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
                  'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-[rgba(0,0,0,0.07)] py-3 mb-3'
                }
              >
                <div className="flex items-center justify-between gap-3 mb-[20px]">
                  <div className="flex items-center justify-start gap-[10px]">
                    <div className="h-[40px] w-[30px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                      <span className="font-bold text-[12px] text-[#2b2b2b] block text-num-en">
                        {handleZeroBeforeNumber(index + 1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-[#2b2b2b] truncate block text-right mb-1">
                        کد پیگیری
                      </span>
                      <span className="text-[10px] font-600 text-gray-600 truncate block text-right text-num-en">
                        {item.tracking_code}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-[10px]">
                    <button
                      className="h-[40px] w-[40px] aspect-square rounded-[7px] border border-red-600 bg-red-50 text-red-600 flex items-center justify-center"
                      onClick={() => {
                        setCanclationReasonDialogOpened(true);
                        setTrackingCode(item.tracking_code);
                      }}
                    >
                      <IconsaxIcons
                        name="Forbidden2"
                        color="currentColor"
                        className="w-[20px] h-[20px]"
                      />
                    </button>
                    {item.payment_status === 'paid' ? (
                      <Link
                        href={`/dashboard/${item.tracking_code}`}
                        className="h-[40px] px-[10px] flex gap-[10px] items-center justify-center bg-white border border-black/20 rounded-[7px] text-black"
                      >
                        <span className="text-[10px] text-current font-semibold w-full text-right block truncate">
                          مشاهده فاکتور
                        </span>
                        <IconsaxIcons
                          name="Eye"
                          color="currentColor"
                          className="w-[17px] h-[17px] shrink-0"
                        />
                      </Link>
                    ) : (
                      <div
                        className={
                          'h-[40px] flex items-center justify-center bg-white border border-black/20 rounded-[7px] text-black px-[20px]'
                        }
                      >
                        <Loading />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Bank"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#2b2b2b] truncate block text-right mb-1">
                      هتل :
                    </span>
                    <span className="text-[10px] font-600 text-gray-600 truncate block text-right">
                      {item.hotel_name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Calendar"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#2b2b2b] truncate block text-right mb-1">
                      تاریخ ورود و خروج :
                    </span>
                    <span className="text-[10px] font-600 text-gray-600 truncate block text-right">
                      {`${moment(item.check_in_date).format('YYYY/MM/DD')} - ${moment(item.check_out_date).format('YYYY/MM/DD')}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Profile2User"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#2b2b2b] truncate block text-right mb-1">
                      مسافران :
                    </span>
                    <span className="text-[10px] font-600 text-gray-600 truncate block text-right">
                      {item.total_guests}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-[10px] mb-[20px]">
                  <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                    <IconsaxIcons
                      name="Status"
                      className="w-[20px] h-[20px] text-black"
                    />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#2b2b2b] truncate block text-right mb-1">
                      وضعیت مالی
                    </span>
                    <div className="flex items-center justify-start gap-[5px]">
                      <div
                        className="size-[7px] shrink-0 rounded-full"
                        style={{
                          backgroundColor: returnStatus(item.payment_status)
                            .color,
                        }}
                      />
                      <span className="text-[10px] font-600 text-gray-600 truncate block text-right">
                        {returnStatus(item.payment_status).title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CustomPagination
            count={paginationCount ?? 12}
            activeIndex={activeIndex ?? 0}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </section>
    );
  }
}
