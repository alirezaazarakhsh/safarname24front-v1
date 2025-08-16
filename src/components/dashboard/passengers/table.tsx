// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { PassengersTableComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
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
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Image from 'next/image';
import EmptyImage from '../../../../public/image/empty.png';
import DeletePassangerDialog from './dialog/deletePassangarDialog';
import EditPassengersDialog from './dialog/editPassengerDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { GETPassengerItem } from '@/types/dashboard/api/get';

// Creating and exporting PassengersTable component as default
export default function PassengersTable({
  className,
  data,
  loading = false,
  paginationCount = 12,
  paginationActiveIndex,
  setPaginationActiveIndex,
  refetch,
}: PassengersTableComponentPropsType): ReactNode {
  // Defining states of component
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const [editDialogOpened, setEditDialogOpened] = useState<boolean>(false);

  const [deleteItemId, setDeleteItemId] = useState<number | undefined>(
    undefined,
  );

  const [editingDialogInfo, setEditDialogInfo] = useState<
    GETPassengerItem | undefined
  >(undefined);

  // Defining variables
  const phoneNumbers = data
    .map((item) => item.phone_number)
    .filter((num): num is string => typeof num === 'string')
    .reduce((acc: string[], num) => {
      const count = acc.filter((n) => n === num).length;
      if (count < 2) acc.push(num);
      return acc;
    }, []);

  // Conditional rendering
  if (loading) {
    return (
      <section
        className={cn(
          'lg:bg-white bg-transparent overflow-hidden lg:rounded-[14px] lg:border border-black/10',
          className,
        )}
      >
        <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-[20px]">
          <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
            مشتری گرامی در این لیست شما دسترسی به تمام اطلاعات مسافران خود
            دارید.
          </span>
          <CustomPagination loading count={12} />
        </div>
        <Table dir="rtl" className="border-none lg:table hidden">
          <TableHeader className="bg-[#f7f7f7] border-y border-y-black/10">
            <TableRow className="border-none">
              <TableHead className="text-right p-[20px] w-8 truncate text-xs font-medium text-[#3d4046]">
                ردیف
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                نام
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                نام خوانوادگی
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                شماره همراه
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                شماره ملی
              </TableHead>
              <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                شماره پاسپورت
              </TableHead>
              <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...new Array(3)].map((item, index) => (
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
                  <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                </TableCell>
                <TableCell className="p-[20px]">
                  <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
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
                    <Skeleton className="rounded-[5px] w-[30px] h-[40px]" />
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
                    <Skeleton className="rounded-[5px] w-[50px] h-[16px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CustomPagination loading count={12} />
        </div>
      </section>
    );
  } else {
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
        <EditPassengersDialog
          isOpened={editDialogOpened}
          data={editingDialogInfo}
          refetch={refetch}
          closeFn={() => {
            setEditDialogOpened(false);
            setEditDialogInfo(undefined);
          }}
        />
        <DeletePassangerDialog
          id={deleteItemId}
          isOpened={deleteDialogOpened}
          refetch={refetch}
          closeFn={() => {
            setDeleteDialogOpened(false);
            setDeleteItemId(undefined);
          }}
        />
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
              مشتری گرامی برای ثبت رزرو هتل میتوانید از دکمه بالا اقدام نمایید
              از همراهی شما متشکریم.
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
                مشتری گرامی در این لیست شما دسترسی به تمام اطلاعات مسافران خود
                دارید.
              </span>
              <CustomPagination
                count={paginationCount}
                activeIndex={paginationActiveIndex}
                setActiveIndex={setPaginationActiveIndex}
              />
            </div>
            <Table dir="rtl" className="border-none lg:table hidden">
              <TableHeader className="bg-gray-100 border-y border-y-black/10">
                <TableRow className="border-none">
                  <TableHead className="text-right p-[20px] w-8 truncate text-xs font-medium text-[#3d4046]">
                    ردیف
                  </TableHead>
                  <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                    نام
                  </TableHead>
                  <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                    نام خوانوادگی
                  </TableHead>
                  <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                    شماره همراه
                  </TableHead>
                  <TableHead className="text-right p-[20px] truncate text-xs font-medium text-[#3d4046]">
                    شماره ملی \ شماره پاسپورت
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
                        {item.first_name}
                      </span>
                    </TableCell>
                    <TableCell className="p-3">
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.last_name}
                      </span>
                    </TableCell>
                    <TableCell className="p-3">
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.phone_number !== '' ? item.phone_number : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="p-3">
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.identification_code !== ''
                          ? item.identification_code
                          : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="p-3 flex items-center justify-end gap-3">
                      <button
                        onClick={() => {
                          setDeleteDialogOpened(true);
                          setDeleteItemId(item.id);
                        }}
                        className="px-6 h-[40px] rounded-md border border-red-600 bg-red-50 text-red-600 font-medium text-xs transition-all duration-500 hover:bg-red-100"
                      >
                        حذف
                      </button>
                      <button
                        className="px-6 h-[40px] rounded-md border border-black/10 bg-white text-black font-medium text-xs transition-all duration-500 hover:bg-black/5"
                        onClick={() => {
                          setEditDialogOpened(true);
                          setEditDialogInfo(item);
                        }}
                      >
                        ویرایش اطلاعات
                      </button>
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
                        <div className="h-[40px] aspect-square rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                          <IconsaxIcons
                            name="DocumentText"
                            color="currentColor"
                            className="w-[17px] h-[17px]"
                          />
                        </div>
                        <div>
                          <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                            نام :
                          </span>
                          <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                            {item.first_name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-[10px]">
                        <button
                          onClick={() => {
                            setDeleteDialogOpened(true);
                            setDeleteItemId(item.id);
                          }}
                          className="h-[40px] w-[40px] aspect-square rounded-[7px] border border-red-600 bg-red-50 text-red-600 flex items-center justify-center"
                        >
                          <IconsaxIcons
                            name="Trash"
                            color="currentColor"
                            className="w-[17px] h-[17px]"
                          />
                        </button>
                        <button
                          className="h-[40px] px-[10px] flex gap-[10px] items-center justify-center bg-white border border-black/10 rounded-[7px] text-black"
                          onClick={() => {
                            setEditDialogOpened(true);
                            setEditDialogInfo(item);
                          }}
                        >
                          <span className="text-[10px] text-current font-medium w-full text-right block truncate">
                            ویرایش اطلاعات
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                      <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                        <IconsaxIcons
                          name="DocumentText"
                          className="w-[20px] h-[20px] text-black"
                        />
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                          نام خانوادگی :
                        </span>
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                      <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                        <IconsaxIcons
                          name="Call"
                          className="w-[20px] h-[20px] text-black"
                        />
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                          شماره همراه :
                        </span>
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.phone_number !== '' ? item.phone_number : '-'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                      <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                        <IconsaxIcons
                          name="Note"
                          className="w-[20px] h-[20px] text-black"
                        />
                      </div>
                      <div>
                        <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                          کد ملی / شماره پاسپورت :
                        </span>
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.identification_code !== ''
                            ? item.identification_code
                            : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <CustomPagination
                count={paginationCount}
                activeIndex={paginationActiveIndex}
                setActiveIndex={setPaginationActiveIndex}
              />
            </div>
          </>
        )}
      </section>
    );
  }
}
