// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { RoomTablePropsType } from '@/types/dashboard/component';
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
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Image from 'next/image';
import { numberSeparation } from '@/utils';
import toast from '../ui/customSonner/toast';
import Tooltip from '../ui/tooltip';
import TakeGiftRuleDialog from './dialog/takeGiftRuleDialog';
import GiftGainErrorDialog from './dialog/giftGainErrorDialog';
import GiftGainedDialog from './dialog/giftGainedDialogOpened';
import { Skeleton } from '@/components/ui/skeleton';
import SafarnameLogo from '../../../../public/image/logo/white.webp';
import CustomPagination from '../ui/customPagination';

// Creating and exporting RoomTable component as default
export default function RoomTable({
  className,
  data,
  loading = false,
  paginationActiveIndex,
  setPaginationActiveIndex,
  paginationCount,
  refetch,
}: RoomTablePropsType): ReactNode {
  // Defining state of component
  const [rules, setRules] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();
  const [acceptRulesDialogOpened, setAcceptRulesDialogOpened] =
    useState<boolean>(false);
  const [giftGainedDialogOpened, setGiftGainedDialogOpened] =
    useState<boolean>(false);
  const [giftGainErrorDialogOpened, setGiftGainErrorDialogOpened] =
    useState<boolean>(false);

  const [idToAchive, setIdToAchive] = useState<number>(0);

  // Defining a function to handle copy to clipboard
  function hanldeClipboardCopy(text: string): void {
    window.navigator.clipboard
      .writeText(text)
      .then(() =>
        toast({
          title: 'کد با موفقیت کپی شد',
          theme: 'green',
          description: `مشتری گرامی کد تخفیف “${text}” کپی شد.`,
        }),
      )
      .catch(() =>
        toast({
          title: 'کد کپی نشد!',
          description: 'خطایی در کپی کردن کد پیش امد.',
        }),
      );
  }

  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-lg lg:border border-black/10 lg:px-0 px-[24px]',
        className,
      )}
    >
      <GiftGainErrorDialog
        isOpened={giftGainErrorDialogOpened}
        refetch={() => refetch && refetch()}
        closeFn={() => {
          setGiftGainErrorDialogOpened(false);
          setRules(undefined);
          setCode(undefined);
        }}
      />
      <GiftGainedDialog
        isOpened={giftGainedDialogOpened}
        closeFn={() => {
          setGiftGainedDialogOpened(false);
          setRules(undefined);
          setCode(undefined);
        }}
      />
      <TakeGiftRuleDialog
        isOpened={acceptRulesDialogOpened}
        refetch={() => refetch && refetch()}
        setGiftGainErrorDialogOpened={setGiftGainErrorDialogOpened}
        setGiftGainedDialogOpened={setGiftGainedDialogOpened}
        rules={rules}
        type="room"
        code={code || ''}
        closeFn={() => {
          setAcceptRulesDialogOpened(false);
          setRules(undefined);
          setCode(undefined);
        }}
      />
      <div className="lg:flex hidden items-center justify-between gap-3 py-5 px-3">
        <span className="block truncate text-right w-full font-bold lg:text-cs85 text-black">
          مشتری گرامی در این لیست امتیازاتی که به شما تعلق میگیرد قرار میگیرد.
        </span>
        <CustomPagination
          loading={loading}
          count={paginationCount || 12}
          activeIndex={paginationActiveIndex}
          setActiveIndex={setPaginationActiveIndex}
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
                <TableHead className="p-3 w-16" />
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  اتاق
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
                  تاریخ انقضای کد تخفیف
                </TableHead>
                <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...new Array(18)].map((item, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    'bg-white hover:bg-white',
                    index + 1 !== 18
                      ? 'border-b border-b-black/10'
                      : 'border-b-0',
                  )}
                >
                  <TableCell className="p-3 w-[30px]">
                    <Skeleton className="rounded-[5px] h-[40px] w-full" />
                  </TableCell>
                  <TableCell className="p-3 w-[40px]">
                    <Skeleton className="rounded-[5px] h-[40px] w-full" />
                  </TableCell>
                  <TableCell className="p-3">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-start gap-2">
                    <Skeleton className="rounded-[5px] h-[20px] w-[100px]" />
                    <Skeleton className="rounded-full w-3 h-3 " />
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
              {[...new Array(3)].map((item, index) => (
                <div
                  key={index}
                  className={
                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                  }
                >
                  <div className="flex items-center justify-between gap-3 mb-[25px]">
                    <div className="flex items-center justify-start gap-[12px]">
                      <Skeleton className="rounded-[8px] h-[60px] w-[60px]" />
                      <div>
                        <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                        <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                      </div>
                    </div>
                    <Skeleton className="rounded-[8px] h-[40px] w-[105px]" />
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <div className="flex items-center justify-start gap-[10px]">
                        <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                        <Skeleton className="rounded-full h-[14px] w-[14px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[12px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[12px] mb-[25px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[12px]">
                    <Skeleton className="rounded-[8px] h-[43px] w-[43px]" />
                    <div>
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px] mb-2" />
                      <Skeleton className="rounded-[8px] h-[18px] w-[100px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Table dir="rtl" className="border-none lg:table hidden">
            <TableHeader className="bg-gray-100 border-y border-y-black/10">
              <TableRow className="border-none">
                <TableHead className="text-right p-3 w-8 truncate text-xs font-medium text-gray-400">
                  ردیف
                </TableHead>
                <TableHead className="p-3 w-16" />
                <TableHead className="text-right p-3 truncate text-xs font-medium text-gray-400">
                  اتاق
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
                  تاریخ انقضای کد تخفیف
                </TableHead>
                <TableHead className="w-[30%] text-right truncate text-xs font-medium" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item, index) => (
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
                  <TableCell className="p-3 w-[40px]">
                    <div className="rounded-[5px] border border-black/10 bg-gray-100 flex items-center justify-center h-[40px] w-full overflow-hidden p-1 relative">
                      <Image
                        alt={item.room.title}
                        width={40}
                        height={40}
                        src={item.room.hotel_main_image || SafarnameLogo.src}
                        className="w-full h-full absolute top-0 left-0 object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <Tooltip content={item.room.hotel_name}>
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        {item.room.hotel_name}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-start gap-2">
                    <Tooltip
                      content={'لطفا برای دیدن کد تخفیف جایزه را دریافت کنید .'}
                    >
                      <span className="text-xs font-medium text-gray-600 truncate block text-right">
                        ********
                      </span>
                    </Tooltip>
                    <div className="text-cs-red shrink-0">
                      <IconsaxIcons
                        name="DocumentCopy"
                        color="currentColor"
                        className="w-3 h-3"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.discount_value)} تومان`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {`${numberSeparation(item.required_points)} امتیاز`}
                    </span>
                  </TableCell>
                  <TableCell className="p-3">
                    <span className="text-xs font-medium text-gray-600 truncate block text-right">
                      {item.expires_at}
                    </span>
                  </TableCell>
                  <TableCell className="p-3 flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        setAcceptRulesDialogOpened(true);
                        setRules(item.activation_rules);
                        setCode(item.code);
                      }}
                      className={
                        'w-[125px] h-[40px] transition-all duration-500 rounded-md flex items-center justify-center disabled:text-gray-600 disabled:bg-gray-100 text-black bg-white border border-black/20 hover:bg-gray-100'
                      }
                    >
                      <span className="text-xs text-current font-medium">
                        دریافت جایزه
                      </span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="lg:hidden block mt-5">
            <div className="flex flex-col">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className={
                    'bg-transparent hover:bg-transparent border-b-[1.5px] border-b-black/10 py-3 mb-3'
                  }
                >
                  <div className="flex items-center justify-between gap-3 mb-[25px]">
                    <div className="flex items-center justify-start gap-[12px]">
                      <div className="rounded-[8px] shrink-0 border border-black/10 bg-gray-100 flex items-center justify-center w-[60px] h-[60px] overflow-hidden p-1 relative">
                        <Image
                          alt={item.room.hotel_name}
                          width={60}
                          height={60}
                          src={item.room.hotel_main_image || SafarnameLogo.src}
                          className="w-full h-full absolute top-0 left-0 object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-black truncate block w-full mb-2 text-right font-semibold text-[12px]">
                          {item.room.title}
                        </span>
                        <span className="text-gray-500 truncate block w-full text-right font-semibold text-[10px]">
                          {item.room.hotel_name}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-[105px] h-[40px] transition-all duration-500 shrink-0 rounded-[7px] flex items-center justify-center disabled:text-gray-600 disabled:bg-gray-100 text-black bg-white border border-black/20 hover:bg-gray-100"
                      onClick={() => {
                        setAcceptRulesDialogOpened(true);
                        setRules(item.activation_rules);
                        setCode(item.code);
                      }}
                    >
                      <span className="text-[10px] text-current font-semibold">
                        دریافت جایزه
                      </span>
                    </button>
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
                        اتاق :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {item.room.hotel_name}
                      </span>
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
                          ********
                        </span>
                        <div className="text-cs-red shrink-0">
                          <IconsaxIcons
                            name="DocumentCopy"
                            color="currentColor"
                            className="w-[14px] h-[14px]"
                          />
                        </div>
                      </div>
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
                        مبلغ تخفیف :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {`${numberSeparation(item.discount_value)} تومان`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-[10px] mb-[25px]">
                    <div className="h-[43px] w-[43px] rounded-[7px] bg-gray-100 flex items-center justify-center shrink-0">
                      <IconsaxIcons
                        name="Star1"
                        className="w-[20px] h-[20px] text-black"
                      />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                        امتیاز مورد نیاز :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {`${numberSeparation(item.required_points)} امتیاز`}
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
                        تاریخ اعتبار کد تخفیف :
                      </span>
                      <span className="text-[10px] font-medium text-gray-600 truncate block text-right">
                        {item.expires_at}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CustomPagination
            count={paginationCount || 12}
            activeIndex={paginationActiveIndex}
            setActiveIndex={setPaginationActiveIndex}
          />
        </>
      )}
    </section>
  );
}
