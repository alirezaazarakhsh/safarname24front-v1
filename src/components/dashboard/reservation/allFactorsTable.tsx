// Forcing next.js to render this component as client side component
'use client';

// Importing part
import moment from 'jalali-moment';
import { AllFactorsTableComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
import { cn } from '@/utils/utils';
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
import AcceptCanclationDialog from '@/components/dashboard/reservation/dialog/acceptCancleationDialog';
import FailedToCancleDialog from '@/components/dashboard/reservation/dialog/failedToCancleDialog';
import CanclationReasonDialog from './dialog/canclationReseaonDialog';

// Creating and exporting AllFactorsTable component as default
export default function AllFactorsTable({
  className,
  data,
}: AllFactorsTableComponentPropsType): ReactNode {
  // Defining states of component
  const [acceptCanclationDialogOpened, setAcceptCanclationDialogOpened] =
    useState<boolean>(false);
  const [failedToCancleDialogOpened, setFailedToCancleDialogOpened] =
    useState<boolean>(false);
  const [canclationReasonDialogOpened, setCanclationReasonDialogOpened] =
    useState<boolean>(false);

  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:border border-black/10',
        data.length === 0
          ? 'lg:h-[500px] h-auto flex items-center justify-center lg:p-10 p-6'
          : '',
        className,
      )}
    >
      <AcceptCanclationDialog
        isOpened={acceptCanclationDialogOpened}
        closeFn={() => setAcceptCanclationDialogOpened(false)}
      />
      <FailedToCancleDialog
        isOpened={failedToCancleDialogOpened}
        closeFn={() => setFailedToCancleDialogOpened(false)}
      />
      <CanclationReasonDialog
        isOpened={canclationReasonDialogOpened}
        closeFn={() => setCanclationReasonDialogOpened(false)}
        openFailedDialog={() => setFailedToCancleDialogOpened(true)}
        openAcceptDialog={() => setAcceptCanclationDialogOpened(true)}
      />
      {data.length === 0 ? (
        <div>
          <Image
            alt="هیچ لیست رزروی فعلا ندارید!"
            src={EmptyImage.src}
            width={500}
            height={500}
            className="h-auto lg:w-[250px] w-[150px] aspect-square block mb-4 mx-auto"
          />
          <span className="block text-center w-full text-black lg:text-cs95 text-cs75 lg:mb-2 mb-3 font-bold">
            هیچ لیست رزروی فعلا ندارید!
          </span>
          <span className="block text-center w-full text-black lg:text-cs09 text-cs07 font-normal">
            مشتری گرامی برای ثبت رزرو هتل میتوانید از دکمه بالا اقدام نمایید از
            همراهی شما متشکریم.
          </span>
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
                  کد پیگیری
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  هتل
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  تاریخ ورود و خروج
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  مسافران
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
                      {item.code}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.hotel}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${moment(item.enterAt).locale('fa').format('YYYY/MM/DD')} - ${item.exitAt ? moment(item.exitAt).locale('fa').format('YYYY/MM/DD') : 'و/ن'}`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.passengers}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <div className="flex items-center justify-start gap-2">
                      <div
                        className="w-2 h-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            item.financialStatus === 'cancled'
                              ? '#F30F26'
                              : item.financialStatus === 'payed'
                                ? '#35A346'
                                : '#4B5BCE',
                        }}
                      />
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.financialStatus === 'payed'
                          ? 'پرداخت شده'
                          : item.financialStatus === 'cancled'
                            ? 'لغو شده'
                            : 'انتظار پرداخت کاربر'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    {item.financialStatus === 'payed' && (
                      <button
                        className="px-6 h-[40px] rounded-md border border-red-600 bg-red-50 text-red-600 font-medium text-xs transition-all duration-500 hover:bg-red-100"
                        onClick={() => setCanclationReasonDialogOpened(true)}
                      >
                        کنسل
                      </button>
                    )}
                    {item.financialStatus === 'payed' ? (
                      <Link
                        href={`/dashboard/reservations/${item.id}`}
                        className="w-[125px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500 bg-white border border-black/20 rounded-md text-black hover:bg-gray-100"
                      >
                        <IconsaxIcons name="Eye" className="w-3 h-3 shrink-0" />
                        <span className="text-xs text-current font-medium">
                          مشاهده فاکتور
                        </span>
                      </Link>
                    ) : (
                      <div className="h-[40px] w-[125px] bg-white border border-black/20 rounded-md text-black flex items-center justify-center">
                        {item.financialStatus === 'cancled' ? (
                          <span className="text-xs font-medium text-current">
                            رزرواسیون رد شد!
                          </span>
                        ) : (
                          <Loading />
                        )}
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
                          {item.code}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[10px]">
                      {item.financialStatus === 'payed' && (
                        <button
                          className="h-[40px] w-[40px] aspect-square rounded-[7px] border border-red-600 bg-red-50 text-red-600 flex items-center justify-center"
                          onClick={() => setCanclationReasonDialogOpened(true)}
                        >
                          <IconsaxIcons
                            name="CloseCircle"
                            color="currentColor"
                            className="w-[17px] h-[17px]"
                          />
                        </button>
                      )}
                      {item.financialStatus === 'payed' ? (
                        <Link
                          href={`/dashboard/reservations/${item.id}`}
                          className="h-[40px] px-[10px] flex gap-[10px] items-center justify-center bg-white border border-black/20 rounded-[7px] text-black"
                        >
                          <span className="text-[10px] text-current font-medium w-full text-right block truncate">
                            {item.financialStatus === 'payed'
                              ? 'پرداخت شده'
                              : item.financialStatus === 'cancled'
                                ? 'لغو شده'
                                : 'انتظار پرداخت کاربر'}
                          </span>
                          <IconsaxIcons
                            name="Eye"
                            color="currentColor"
                            className="w-[17px] h-[17px]"
                          />
                        </Link>
                      ) : (
                        <div
                          className={cn(
                            'h-[40px] flex items-center justify-center bg-white border border-black/20 rounded-[7px] text-black',
                            item.financialStatus === 'cancled'
                              ? 'px-[10px]'
                              : 'px-[20px]',
                          )}
                        >
                          {item.financialStatus === 'cancled' ? (
                            <span className="text-cs07 font-normal text-current">
                              رزرواسیون رد شد!
                            </span>
                          ) : (
                            <Loading />
                          )}
                        </div>
                      )}
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
                        {item.hotel}
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
                        {`${moment(item.enterAt).locale('fa').format('YYYY/MM/DD')} - ${item.exitAt ? moment(item.exitAt).locale('fa').format('YYYY/MM/DD') : 'و/ن'}`}
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
                        {item.passengers}
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
                              item.financialStatus === 'cancled'
                                ? '#F30F26'
                                : item.financialStatus === 'payed'
                                  ? '#35A346'
                                  : '#4B5BCE',
                          }}
                        />
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.financialStatus === 'payed'
                            ? 'پرداخت شده'
                            : item.financialStatus === 'cancled'
                              ? 'لغو شده'
                              : 'انتظار پرداخت کاربر'}
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
