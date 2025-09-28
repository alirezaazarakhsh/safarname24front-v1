// Forcing next.js to render this component as client side component
'use client';

// Importing part
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
import { handleZeroBeforeNumber, hanldeClipboardCopy } from '@/utils/string';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Skeleton } from '@/components/ui/skeleton';
import Tooltip from '../ui/tooltip';
import { addCommas } from '@persian-tools/persian-tools';
import moment from 'jalali-moment';

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
      <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
        <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
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
          <Table dir="rtl" className="border-none lg:table hidden">
            <TableHeader className="bg-gray-100 border-y border-y-black/10">
              <TableRow className="border-none">
                <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                  ردیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  عنوان
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  کد تخفیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  زمان فعال سازی
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  مبلغ تخفیف
                </TableHead>
                <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
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
                  <TableCell className="p-3 w-[30px]">
                    <Skeleton className="rounded-[5px] h-[40px] w-full" />
                  </TableCell>
                  <TableCell className="p-3 w-[30px]">
                    <Skeleton className="rounded-[5px] h-[40px] w-full" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    <Skeleton className="rounded-[5px] h-[40px] w-[125px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="lg:hidden block mt-5">
            <div className="flex flex-col">
              {[...new Array(18)].map((_, index) => (
                <div
                  key={index}
                  className={
                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                  }
                >
                  <div className="flex items-center justify-between gap-3 mb-[20px]">
                    <div className="flex items-center justify-start gap-[10px]">
                      <Skeleton className="h-[43px] w-[43px] rounded-[7px] shrink-0" />
                      <div>
                        <Skeleton className="w-[100px] h-[18px] rounded-[7px] mb-1" />
                        <Skeleton className="w-[100px] h-[18px] rounded-[7px]" />
                      </div>
                    </div>
                    <Skeleton className="w-[100px] h-[40px] rounded-[7px]" />
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <Skeleton className="w-[30px] h-[40px] rounded-[7px]" />
                    <div>
                      <Skeleton className="w-[100px] h-[18px] rounded-[7px] mb-1" />
                      <Skeleton className="w-[100px] h-[18px] rounded-[7px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <Skeleton className="w-[30px] h-[40px] rounded-[7px]" />
                    <div>
                      <Skeleton className="w-[100px] h-[18px] rounded-[7px] mb-1" />
                      <Skeleton className="w-[100px] h-[18px] rounded-[7px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <Skeleton className="w-[30px] h-[40px] rounded-[7px]" />
                    <div>
                      <Skeleton className="w-[100px] h-[18px] rounded-[7px] mb-1" />
                      <Skeleton className="w-[100px] h-[18px] rounded-[7px]" />
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
          <Table dir="rtl" className="border-none lg:table hidden">
            <TableHeader className="bg-gray-100 border-y border-y-black/10">
              <TableRow className="border-none">
                <TableHead className="text-right p-3 w-[40px] truncate text-xs font-medium text-gray-400">
                  ردیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  عنوان
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  کد تخفیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  مبلغ تخفیف
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  امتیاز مورد نیاز
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  زمان فعال سازی
                </TableHead>
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  تاریخ اعتبار
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
                    <div className="rounded-[5px] bg-gray-100 flex items-center justify-center h-[30px] w-full">
                      <span className="font-normal text-[12px] text-black block text-num-en">
                        {handleZeroBeforeNumber(index + 1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <Tooltip
                      content={
                        item.discount_type === 'تخفیف اتاق'
                          ? item.related_info.room_name || '-'
                          : item.related_info.shopping_center_name || '-'
                      }
                    >
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.discount_type === 'تخفیف اتاق'
                          ? item.related_info.room_name || '-'
                          : item.related_info.shopping_center_name || '-'}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-start gap-2">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.code}
                    </span>
                    <button
                      onClick={() => hanldeClipboardCopy(item.code)}
                      className="text-cs-red shrink-0"
                    >
                      <IconsaxIcons
                        name="DocumentCopy"
                        color="currentColor"
                        className="w-3 h-3"
                      />
                    </button>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${item.discount_value} تومان`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${addCommas(item.required_points)} امتیاز`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.activated_at
                        ? moment(item.activated_at).format('YYYY/MM/DD')
                        : '-'}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.expires_at
                        ? moment(item.expires_at).format('YYYY/MM/DD')
                        : '-'}
                    </span>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    <div
                      className={cn(
                        'w-[125px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500  rounded-md',
                        item.reward_claimed
                          ? 'text-gray-700 bg-gray-200'
                          : 'text-green-500 bg-green-500/10',
                      )}
                    >
                      <span className="text-xs text-current font-medium text-right truncate">
                        {item.reward_claimed ? 'استفاده شد' : 'فعال میباشد'}
                      </span>
                    </div>
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
                          عنوان
                        </span>
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.discount_type === 'تخفیف اتاق'
                            ? item.related_info.room_name || '-'
                            : item.related_info.shopping_center_name || '-'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[10px]">
                      <div
                        className={cn(
                          'w-[100px] h-[40px] flex gap-2 items-center justify-center transition-all duration-500  rounded-md',
                          item.reward_claimed
                            ? 'text-gray-700 bg-gray-200'
                            : 'text-green-500 bg-green-500/10',
                        )}
                      >
                        <span className="text-[10px] text-current font-semibold w-full text-center block truncate">
                          {item.reward_claimed ? 'استفاده شد' : 'فعال میباشد'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="DiscountShape"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        کد تخفیف :
                      </span>
                      <div className="flex items-center justify-start gap-[10px]">
                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                          {item.code}
                        </span>
                        <button
                          onClick={() => hanldeClipboardCopy(item.code)}
                          className="text-cs-red shrink-0"
                        >
                          <IconsaxIcons
                            name="DocumentCopy"
                            color="currentColor"
                            className="w-[14px] h-[14px]"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Money2"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        مبلغ تخفیف
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {`${addCommas(item.discount_value)} تومان`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Cup"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        امتیاز مورد نیاز
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {`${addCommas(item.required_points)} امتیاز`}
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
                        زمان فعال سازی
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {item.activated_at
                          ? moment(item.activated_at).format('YYYY/MM/DD')
                          : '-'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="CalendarRemove"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        تاریخ اعتبار
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {item.expires_at
                          ? moment(item.expires_at).format('YYYY/MM/DD')
                          : '-'}
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
