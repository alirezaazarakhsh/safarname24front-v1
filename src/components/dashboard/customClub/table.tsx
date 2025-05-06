// Forcing next.js to render this component as client side component
'use client';

// Importing part
import moment from 'jalali-moment';
import { CustomersClubTablePropsType } from '@/types/dashboard/component';
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
import Image from 'next/image';
import EmptyImage from '../../../../public/image/empty.png';
import { numberSeparation } from '@/utils';

// Creating and exporting CustomersClubTable component as default
export default function CustomersClubTable({
  className,
  data,
}: CustomersClubTablePropsType): ReactNode {
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
            موردی یافت نشد!
          </span>
          <span className="block text-center w-full lg:text-black text-gray-500 lg:text-cs09 text-[10px] font-normal lg:mb-0 mb-6">
            مشتری گرامی جستجوی که انجام دادید متاسفانه لیستی موردی پیدا نشد لطفا
            مجدد تلاش نمایید از همراهی شما متشکریم.
          </span>
        </div>
      ) : (
        <>
          <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
            <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
              مشتری گرامی در این لیست امتیازاتی که به شما تعلق میگیرد قرار
              میگیرد.
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
                <TableHead className="p-3 w-16" />
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
                  تاریخ اعتبار کد تخفیف
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
                  <TableCell className="p-3 w-[40px]">
                    <div className="rounded-[5px] border border-black/10 bg-gray-100 flex items-center justify-center h-[40px] w-full overflow-hidden p-1">
                      <Image
                        alt={item.title}
                        width={40}
                        height={40}
                        src={item.companyImg}
                        className="w-full h-auto"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.title}
                    </span>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-start gap-2">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.discount.code}
                    </span>
                    <button
                      className="text-cs-red shrink-0"
                      onClick={() => {
                        window.navigator.clipboard
                          .writeText(item.discount.code)
                          .then(() => {})
                          .catch(() => {});
                      }}
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
                      {`${numberSeparation(item.discount.price)} تومان`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${item.score} امتیاز`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {moment(item.discount.endsAt)
                        .locale('fa')
                        .format('jYYYY/jMM/jDD')}
                    </span>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    {item.status !== 'deactive' ? (
                      <button
                        disabled={item.status === 'used'}
                        className={cn(
                          'w-[125px] h-[40px] transition-all duration-500 rounded-md flex items-center justify-center',
                          item.status === 'unused'
                            ? 'text-black bg-white border border-black/20 hover:bg-gray-100'
                            : item.status === 'active'
                              ? 'text-green-600 bg-green-100 hover:bg-green-200'
                              : 'text-gray-600 bg-gray-100',
                        )}
                      >
                        <span className="text-xs text-current font-medium">
                          {item.status === 'used'
                            ? 'استفاده شد'
                            : item.status === 'active'
                              ? 'فعال میباشد'
                              : 'دریافت جایزه'}
                        </span>
                      </button>
                    ) : (
                      <div className="w-[125px] h-[40px] rounded-md bg-cs-red/10 text-cs-red flex items-center justify-center">
                        <span className="text-xs text-current font-medium">
                          منقضی شده
                        </span>
                      </div>
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

//<div className="lg:hidden block mt-5">
//            <div className="flex flex-col">
//              {data.map((item, index) => (
//                <div
//                  key={index}
//                  className={
//                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
//                  }
//                >
//                  <div className="flex items-center justify-between gap-3 mb-[20px]">
//                    <div className="flex items-center justify-start gap-[10px]">
//                      <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
//                        <IconsaxIcons
//                          name="DocumentText"
//                          className="w-[20px] h-[20px] text-black"
//                        />
//                      </div>
//                      <div>
//                        <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
//                          نوع خدمات :
//                        </span>
//                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
//                          {item.type === 'cashOut'
//                            ? 'برداشت وجه'
//                            : item.type === 'cartToCart'
//                              ? 'کارت به کارت'
//                              : 'افزایش کیف پول'}
//                        </span>
//                      </div>
//                    </div>
//                    <div className="flex items-center justify-between gap-[10px]">
//                      {item.status === 'successfull' ? (
//                        <Link
//                          href={`/dashboard/financial/factors/${item.id}`}
//                          className="h-[40px] px-[10px] flex gap-[10px] items-center justify-center bg-white border border-black/20 rounded-[7px] text-black"
//                        >
//                          <span className="text-[10px] text-current font-medium w-full text-right block truncate">
//                            مشاهده فاکتور
//                          </span>
//                          <IconsaxIcons
//                            name="Eye"
//                            color="currentColor"
//                            className="w-[17px] h-[17px]"
//                          />
//                        </Link>
//                      ) : (
//                        <div
//                          className={
//                            'h-[40px] flex items-center justify-center bg-white border border-black/20 rounded-[7px] text-black px-[20px]'
//                          }
//                        >
//                          <span className="text-[10px] text-current font-medium w-full text-right block truncate">
//                            عملیات لغو شد!
//                          </span>
//                        </div>
//                      )}
//                    </div>
//                  </div>
//                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
//                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
//                      <IconsaxIcons
//                        name="Moneys"
//                        className="w-[20px] h-[20px] text-black"
//                      />
//                    </div>
//                    <div>
//                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
//                        مبلغ صورتحساب :
//                      </span>
//                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
//                        {`${numberSeparation(item.amount)} تومان`}
//                      </span>
//                    </div>
//                  </div>
//                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
//                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
//                      <IconsaxIcons
//                        name="Calendar"
//                        className="w-[20px] h-[20px] text-black"
//                      />
//                    </div>
//                    <div>
//                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
//                        تاریخ و زمان صدور :
//                      </span>
//                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
//                        {moment(item.createdAt)
//                          .locale('fa')
//                          .format('jYYYY/jMM/jDD A - HH:mm')}
//                      </span>
//                    </div>
//                  </div>
//                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
//                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
//                      <IconsaxIcons
//                        name="Status"
//                        className="w-[20px] h-[20px] text-black"
//                      />
//                    </div>
//                    <div>
//                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
//                        وضعیت مالی
//                      </span>
//                      <div className="flex items-center justify-start gap-[10px]">
//                        <div
//                          className="w-[4px] h-[4px] shrink-0 rounded-full"
//                          style={{
//                            backgroundColor:
//                              item.status === 'unsuccessfull'
//                                ? '#F30F26'
//                                : '#35A346',
//                          }}
//                        />
//                        <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
//                          {item.status === 'successfull' &&
//                          item.type === 'cashOut'
//                            ? 'انجام شده'
//                            : item.status === 'successfull' &&
//                                item.type === 'cartToCart'
//                              ? 'تایید شده'
//                              : item.status === 'successfull' &&
//                                  item.type === 'add'
//                                ? 'پرداخت شده'
//                                : item.status === 'unsuccessfull'
//                                  ? 'لغو شده'
//                                  : 'لغو شده'}
//                        </span>
//                      </div>
//                    </div>
//                  </div>
//                </div>
//              ))}
//            </div>
//            <CustomPagination count={12} />
//          </div>
