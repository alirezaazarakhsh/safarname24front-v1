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

// Creating and exporting PassengersTable component as default
export default function PassengersTable({
  className,
  data,
}: PassengersTableComponentPropsType): ReactNode {
  // Defining states of component
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const [editDialogOpened, setEditDialogOpened] = useState<boolean>(false);
  const [editingDialogInfo, setEditDialogInfo] = useState<
    (typeof data)[0] | undefined
  >(undefined);

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
      <EditPassengersDialog
        isOpened={editDialogOpened}
        data={editingDialogInfo}
        closeFn={() => {
          setEditDialogOpened(false);
          setEditDialogInfo(undefined);
        }}
      />
      <DeletePassangerDialog
        isOpened={deleteDialogOpened}
        closeFn={() => setDeleteDialogOpened(false)}
      />
      {data.length === 0 ? (
        <div>
          <Image
            alt='هیچ لیست رزروی فعلا ندارید!'
            src={EmptyImage.src}
            width={500}
            height={500}
            className='h-auto lg:w-[250px] w-[200px] aspect-square block mb-4 mx-auto'
          />
          <span className='block text-center w-full text-black lg:text-cs95 text-[12px] lg:mb-2 mb-3 font-bold'>
            هیچ لیست رزروی فعلا ندارید!
          </span>
          <span className='block text-center w-full lg:text-black text-gray-500 lg:text-cs09 text-[10px] font-normal lg:mb-0 mb-6'>
            مشتری گرامی برای ثبت رزرو هتل میتوانید از دکمه بالا اقدام نمایید از
            همراهی شما متشکریم.
          </span>
          <Button className='lg:hidden flex items-center justify-center gap-2 mx-auto text-black bg-gray-100 rounded-[7px] p-[14px]'>
            <IconsaxIcons
              name='Add'
              className='w-[18px] h-[18px] text-gray-600 shrink-0'
            />
            <span className='block text-right truncate font-normal whitespace-nowrap text-[12px] text-current'>
              ثبت رزرو
            </span>
          </Button>
        </div>
      ) : (
        <>
          <div className='lg:flex hidden items-center justify-between gap-3 py-5 px-3'>
            <span className='block truncate text-right w-full font-bold lg:text-cs85 text-black'>
              مشتری گرامی در این لیست شما دسترسی به تمام اطلاعات مسافران خود
              دارید.
            </span>
            <CustomPagination
              count={12}
              // onChange={(index) => console.log(index)}
            />
          </div>
          <Table dir='rtl' className='border-none lg:table hidden'>
            <TableHeader className='bg-gray-100 border-y border-y-black/10'>
              <TableRow className='border-none'>
                <TableHead className='text-right p-3 w-8 truncate text-xs font-medium text-gray-400'>
                  ردیف
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  نام
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  نام و نام خانوادگی
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  شماره همراه
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  شماره ملی / شماره پاسپورت
                </TableHead>
                <TableHead className='w-[30%] text-right truncate text-xs font-medium' />
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
                  <TableCell className='p-3 w-[30px]'>
                    <div className='rounded-[5px] bg-gray-100 flex items-center justify-center h-[40px] w-full'>
                      <span className='font-normal text-[12px] text-black block text-num-en'>
                        {handleZeroBeforeNumber(index + 1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='p-3'>
                    <span className='text-xs font-medium text-gray-600 truncate block text-right'>
                      {item.name.firstName}
                    </span>
                  </TableCell>
                  <TableCell className='p-3'>
                    <span className='text-xs font-medium text-gray-600 truncate block text-right'>
                      {item.name.lastName}
                    </span>
                  </TableCell>
                  <TableCell className='p-3'>
                    <span className='text-xs font-medium text-gray-600 truncate block text-right'>
                      {item.tell}
                    </span>
                  </TableCell>
                  <TableCell className='p-3'>
                    <span className='text-xs font-medium text-gray-600 truncate block text-right'>
                      {item.meliCodeOrPassportNumber}
                    </span>
                  </TableCell>
                  <TableCell className='p-3 flex items-center justify-end gap-3'>
                    <button
                      onClick={() => setDeleteDialogOpened(true)}
                      className='px-6 h-[40px] rounded-md border border-red-600 bg-red-50 text-red-600 font-medium text-xs transition-all duration-500 hover:bg-red-100'
                    >
                      حذف
                    </button>
                    <button
                      className='px-6 h-[40px] rounded-md border border-black/10 bg-white text-black font-medium text-xs transition-all duration-500 hover:bg-black/5'
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
          <div className='lg:hidden block mt-5'>
            <div className='flex flex-col'>
              {data.map((item, index) => (
                <div
                  key={index}
                  className={
                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                  }
                >
                  <div className='flex items-center justify-between gap-3 mb-[20px]'>
                    <div className='flex items-center justify-start gap-[10px]'>
                      <div className='h-[40px] aspect-square rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0'>
                        <IconsaxIcons
                          name='DocumentText'
                          color='currentColor'
                          className='w-[17px] h-[17px]'
                        />
                      </div>
                      <div>
                        <span className='text-[12px] font-bold text-black truncate block text-right mb-1'>
                          نام :
                        </span>
                        <span className='text-[10px] font-medium text-gray-600 truncate block text-right'>
                          {item.name.firstName}
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center justify-between gap-[10px]'>
                      <button
                        onClick={() => setDeleteDialogOpened(true)}
                        className='h-[40px] w-[40px] aspect-square rounded-[7px] border border-red-600 bg-red-50 text-red-600 flex items-center justify-center'
                      >
                        <IconsaxIcons
                          name='Trash'
                          color='currentColor'
                          className='w-[17px] h-[17px]'
                        />
                      </button>
                      <button
                        className='h-[40px] px-[10px] flex gap-[10px] items-center justify-center bg-white border border-black/10 rounded-[7px] text-black'
                        onClick={() => {
                          setEditDialogOpened(true);
                          setEditDialogInfo(item);
                        }}
                      >
                        <span className='text-[10px] text-current font-medium w-full text-right block truncate'>
                          ویرایش اطلاعات
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='flex items-center justify-start gap-[10px] mb-[25px]'>
                    <div className='h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0'>
                      <IconsaxIcons
                        name='DocumentText'
                        className='w-[20px] h-[20px] text-black'
                      />
                    </div>
                    <div>
                      <span className='text-[12px] font-bold text-black truncate block text-right mb-1'>
                        نام خانوادگی :
                      </span>
                      <span className='text-[10px] font-medium text-gray-600 truncate block text-right'>
                        {item.name.lastName}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center justify-start gap-[10px] mb-[25px]'>
                    <div className='h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0'>
                      <IconsaxIcons
                        name='Call'
                        className='w-[20px] h-[20px] text-black'
                      />
                    </div>
                    <div>
                      <span className='text-[12px] font-bold text-black truncate block text-right mb-1'>
                        شماره همراه :
                      </span>
                      <span className='text-[10px] font-medium text-gray-600 truncate block text-right'>
                        {item.tell}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center justify-start gap-[10px] mb-[25px]'>
                    <div className='h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0'>
                      <IconsaxIcons
                        name='Note'
                        className='w-[20px] h-[20px] text-black'
                      />
                    </div>
                    <div>
                      <span className='text-[12px] font-bold text-black truncate block text-right mb-1'>
                        شماره ملی / شماره پاسپورت :
                      </span>
                      <span className='text-[10px] font-medium text-gray-600 truncate block text-right'>
                        {item.meliCodeOrPassportNumber}
                      </span>
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
