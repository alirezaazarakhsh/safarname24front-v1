// Forcing next.js to render this component as client side component
'use client';

// Importing part
import moment from 'jalali-moment';
import { CustomerClubListTablePropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
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
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { numberSeparation } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting CustomerClubListTable component as default
export default function CustomerClubListTable({
  className,
  data,
  loading = false,
  activeIndex,
  setActiveIndex,
  paginationCount = 12,
}: CustomerClubListTablePropsType): ReactNode {
  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:border border-black/10 lg:px-0 px-[20px]',
        className,
      )}
    >
      <div className='lg:flex hidden items-center justify-between gap-3 py-5 px-3'>
        <span className='block truncate text-right w-full font-bold lg:text-cs85 text-black'>
          مشتری گرامی در این لیست شما دسترسی به تمام جایزه های دریافتی دارید.
        </span>
        <CustomPagination
          count={loading ? 12 : paginationCount}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          loading={loading}
        />
      </div>
      {loading ? (
        <>
          <Table dir='rtl' className='border-none lg:table hidden'>
            <TableHeader className='bg-gray-100 border-y border-y-black/10'>
              <TableRow className='border-none'>
                <TableHead className='text-right p-3 w-8 truncate text-xs font-medium text-gray-400'>
                  ردیف
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  عنوان
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  تاریخ و زمان رزرو
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  مبلغ تخفیف
                </TableHead>
                <TableHead className='w-[30%] text-right truncate text-xs font-medium' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...new Array(18)].map((_, index) => (
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
                    <Skeleton className='rounded-[5px] h-[40px] w-full' />
                  </TableCell>
                  <TableCell className='p-3'>
                    <Skeleton className='rounded-[5px] h-[20px] w-[100px]' />
                  </TableCell>
                  <TableCell className='p-3'>
                    <Skeleton className='rounded-[5px] h-[20px] w-[100px]' />
                  </TableCell>
                  <TableCell className='p-3'>
                    <Skeleton className='rounded-[5px] h-[20px] w-[100px]' />
                  </TableCell>
                  <TableCell className='p-3 flex items-center justify-end gap-3'>
                    <Skeleton className='rounded-[5px] h-[40px] w-[125px]' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='lg:hidden block mt-5'>
            <div className='flex flex-col'>
              {[...new Array(18)].map((_, index) => (
                <div
                  key={index}
                  className={
                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                  }
                >
                  <div className='flex items-center justify-between gap-3 mb-[20px]'>
                    <div className='flex items-center justify-start gap-[10px]'>
                      <Skeleton className='h-[43px] w-[43px] rounded-[7px] shrink-0' />
                      <div>
                        <Skeleton className='w-[100px] h-[18px] rounded-[7px] mb-1' />
                        <Skeleton className='w-[100px] h-[18px] rounded-[7px]' />
                      </div>
                    </div>
                    <Skeleton className='w-[100px] h-[40px] rounded-[7px]' />
                  </div>
                  <div className='flex items-center justify-start gap-[10px] mb-[25px]'>
                    <Skeleton className='w-[30px] h-[40px] rounded-[7px]' />
                    <div>
                      <Skeleton className='w-[100px] h-[18px] rounded-[7px] mb-1' />
                      <Skeleton className='w-[100px] h-[18px] rounded-[7px]' />
                    </div>
                  </div>
                  <div className='flex items-center justify-start gap-[10px] mb-[25px]'>
                    <Skeleton className='w-[30px] h-[40px] rounded-[7px]' />
                    <div>
                      <Skeleton className='w-[100px] h-[18px] rounded-[7px] mb-1' />
                      <Skeleton className='w-[100px] h-[18px] rounded-[7px]' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CustomPagination count={12} loading />
          </div>
        </>
      ) : (
        <>
          <Table dir='rtl' className='border-none lg:table hidden'>
            <TableHeader className='bg-gray-100 border-y border-y-black/10'>
              <TableRow className='border-none'>
                <TableHead className='text-right p-3 w-8 truncate text-xs font-medium text-gray-400'>
                  ردیف
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  عنوان
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  تاریخ و زمان رزرو
                </TableHead>
                <TableHead className='text-right p-3 truncate text-xs font-medium text-gray-400'>
                  مبلغ تخفیف
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
                      {item.prize.title}
                    </span>
                  </TableCell>
                  <TableCell className='p-3'>
                    <span className='text-xs font-medium text-gray-600 truncate block text-right'>
                      {moment(item.created)
                        .locale('fa')
                        .format('jYYYY/jMM/jDD')}
                    </span>
                  </TableCell>
                  <TableCell className='p-3'>
                    <span className='text-xs font-medium text-gray-600 truncate block text-right'>
                      {`${numberSeparation(item.prize.discount_price)} تومان`}
                    </span>
                  </TableCell>
                  <TableCell className='p-3 flex items-center justify-end gap-3'>
                    <div className='w-[125px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500 bg-white border border-black/20 rounded-md text-black'>
                      <IconsaxIcons
                        name='Cup'
                        color='currentColor'
                        className='w-3 h-3 shrink-0'
                      />
                      <span className='text-xs text-current font-medium text-right truncate'>
                        {`N/A امتیاز`}
                      </span>
                    </div>
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
                      <div className='h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0'>
                        <IconsaxIcons
                          name='DocumentText'
                          className='w-[20px] h-[20px] text-black'
                        />
                      </div>
                      <div>
                        <span className='text-[12px] font-bold text-black truncate block text-right mb-1'>
                          عنوان
                        </span>
                        <span className='text-[10px] font-medium text-gray-600 truncate block text-right'>
                          {item.prize.title}
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center justify-between gap-[10px]'>
                      <div
                        className={
                          'h-[40px] gap-2 flex items-center justify-center bg-white border border-black/20 rounded-[7px] text-black px-[20px]'
                        }
                      >
                        <IconsaxIcons
                          name='Cup'
                          color='currentColor'
                          className='w-[12px] h-[12px] shrink-0'
                        />
                        <span className='text-[10px] text-current font-medium w-full text-right block truncate'>
                          {`N/A امتیاز`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-start gap-[10px] mb-[25px]'>
                    <div className='h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0'>
                      <IconsaxIcons
                        name='Calendar1'
                        className='w-[20px] h-[20px] text-black'
                      />
                    </div>
                    <div>
                      <span className='text-[12px] font-bold text-black truncate block text-right mb-1'>
                        تاریخ و زمان رزرو
                      </span>
                      <span className='text-[10px] font-medium text-gray-600 truncate block text-right'>
                        {moment(item.created)
                          .locale('fa')
                          .format('jYYYY/jMM/jDD')}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center justify-start gap-[10px] mb-[25px]'>
                    <div className='h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0'>
                      <IconsaxIcons
                        name='Money2'
                        className='w-[20px] h-[20px] text-black'
                      />
                    </div>
                    <div>
                      <span className='text-[12px] font-bold text-black truncate block text-right mb-1'>
                        مبلغ تخفیف
                      </span>
                      <span className='text-[10px] font-medium text-gray-600 truncate block text-right'>
                        {`${numberSeparation(item.prize.discount_price)} تومان`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CustomPagination
              count={loading ? 12 : paginationCount}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              loading={loading}
            />
          </div>
        </>
      )}
    </section>
  );
}
