// Forcing next.js to render this component as client side component
'use client';

import IconsaxIcons from '@/components/icons/iconsaxIcons';
// Importing part
import { TransactionsTablePropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { handleZeroBeforeNumber } from '@/utils/string';
import moment from 'jalali-moment';
import { ReactNode } from 'react';
import CustomPagination from '../ui/customPagination';

// Creating and exporting TransactionsMobile component as default
export default function TransactionsMobile({
  data,
  className,
}: TransactionsTablePropsType): ReactNode {
  // Returning JSX
  return (
    <div className={className}>
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
                    {item.codePeigiri}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-[10px]">
                {item.status === 'successfull' ? (
                  <button className="h-[40px] px-[20px] border flex gap-[10px] items-center justify-center bg-white text-black border-black/10 rounded-[7px]">
                    <span className="text-[10px] text-current font-medium w-full text-right block truncate">
                      خروجی اکسل
                    </span>
                  </button>
                ) : (
                  <div className="relative">
                    <div className="h-[40px] px-[20px] flex gap-[10px] items-center justify-center bg-cs-red/10 text-cs-red rounded-[7px] peer">
                      <span className="text-[10px] text-current font-medium w-full text-right block truncate">
                        عدم پرداخت
                      </span>
                    </div>
                    <div className="p-2 rounded-[6px] bg-[#FFE9EB] text-cs-red absolute bottom-[calc(100%+20px)]  left-[25%] w-[218px] transition-all duration-500 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible">
                      <p className="text-right text-current lg:font-light font-medium lg:text-[9px] text-[8px]">
                        مشتری گرامی پرداخت شما به دلیل مشکلات فنی به وجود آمده
                        موفقیت آمیز نبود بنابراین فاکتور برای شما صادر نخواهد
                        شد.
                      </p>
                      <div className="absolute top-full -translate-y-[50%] left-[20px] w-[15px] h-[15px] bg-[#FFE9EB] rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px] mb-[25px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="Money"
                  className="w-[20px] h-[20px] text-black"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  بودجه :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {`${numberSeparation(item.price)} تومان`}
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
                  تاریخ و روز :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {moment(item.createdAt)
                    .locale('fa')
                    .format('HH:mm a - jYYYY/jMM/jDD')}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[10px] mb-[25px]">
              <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons
                  name="Card"
                  className="w-[20px] h-[20px] text-black"
                />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  کارت بانکی :
                </span>
                <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                  {item.bank}
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
                        item.status === 'unsucessfull' ? '#F30F26' : '#35A346',
                    }}
                  />
                  <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                    {item.status === 'successfull'
                      ? 'پرداخت شده'
                      : 'پرداخت ناموفق'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <CustomPagination count={12} />
      </div>
    </div>
  );
}
