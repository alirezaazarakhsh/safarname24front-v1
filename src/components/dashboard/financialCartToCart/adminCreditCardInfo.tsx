// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { AdminCreditCardInfoPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useEffect, useState } from 'react';
import CardShowCase from './cardShowCase';
import { getBankFromCard, hanldeClipboardCopy } from '@/utils/string';
import BankIcon from '../ui/bankIcon';
import { numberSeparation } from '@/utils';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETAdminCreditCard } from '@/types/dashboard/api/get';
import { BankInfo } from '@/types/utils';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting AdminCreditCardInfo component as default
export default function AdminCreditCardInfo({
  className,
}: AdminCreditCardInfoPropsType): JSX.Element {
  // Defining hooks 
  const [cardInfo, setCardInfo] = useState<BankInfo | null>(null);
  const getData = useApiQuery<GETAdminCreditCard>({
    url: "/finance/admin-card-settings/",
    queryKey: ["admin-card-info"],
    options: {
      staleTime: Infinity,
      refetchInterval: Infinity
    }
  });

  const loading = getData.isLoading;

  // Using useEffect to set info of credit card
  useEffect(() => {
    if (!getData.isLoading && !getData.isError && getData.data) {
      setCardInfo(getBankFromCard(getData.data.card_number))
    }
  }, [getData.isLoading])

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden',
        className,
      )}
    >
      <div className="flex items-center justif-start gap-3 lg:p-4 p-[14px] border-b border-b-black/10">
        <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Crown1"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            حساب بانکی مدیر
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            برای واریز وجه به اطلاعات زیر دقت زیادی توجه بفرمایید.
          </p>
        </div>
      </div>
      <div className="lg:p-4 p-[14px] grid lg:grid-cols-7 gap-4">
        <div className="h-[190px] bg-gray-200 rounded-xl py-4 px-8 overflow-hidden lg:col-span-3">
          {
            loading
              ? <Skeleton className="h-[calc(190px-32px)] bg-black/50" />
              : (
                <CardShowCase
                  className="h-[calc(190px-32px)]"
                  data={{
                    bankIcon: cardInfo?.type || 'unknown',
                    bankName: cardInfo?.name || 'نامعلوم',
                    iban: getData.data?.iban_number || "-",
                    holderName: getData.data?.account_holder_name || "-",
                    number: getData.data?.card_number || "-",
                  }}
                />
              )
          }
        </div>
        <div className="lg:col-span-4">
          <div className="grid lg:grid-cols-2 gap-4 flex-wrap mb-6">
            <div className="flex items-center justif-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="User"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  صاحب کارت
                </span>
                {
                  loading
                    ? <Skeleton className='h-[15px] w-full' />
                    : (
                      <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                        {`به نام ${getData.data?.account_holder_name || "-"}`}
                      </span>
                    )
                }
              </div>
            </div>
            <div className="flex items-center justif-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <BankIcon
                  name={cardInfo?.type || 'unknown'}
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  بانک
                </span>
                {
                  loading
                    ? <Skeleton className='h-[15px] w-full' />
                    : (
                      <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                        {cardInfo?.name || 'نامعلوم'}
                      </span>
                    )
                }
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justif-start gap-3 flex-1 overflow-hidden">
                <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                  <IconsaxIcons
                    name="CardEdit"
                    className="w-[20px] h-[20px]"
                    color="currentColor"
                  />
                </div>
                <div className="overflow-hidden w-full">
                  <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                    شماره کارت
                  </span>
                  {
                    loading
                      ? <Skeleton className='h-[15px] w-full' />
                      : (
                        <span dir='ltr' className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                          {numberSeparation(getData.data?.card_number || "****************", ' - ', 4)}
                        </span>
                      )
                  }
                </div>
              </div>
              <button
                className="size-[45px] shrink-0 flex items-center justify-center lg:rounded-md rounded-[10px] transition-all duration-500 bg-gray-100/50 hover:bg-gray-100 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                onClick={() => hanldeClipboardCopy(getData.data?.card_number || "****************")}
              >
                <IconsaxIcons
                  name="DocumentCopy"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justif-start gap-3 flex-1 overflow-hidden">
                <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                  <IconsaxIcons
                    name="CardEdit"
                    className="w-[20px] h-[20px]"
                    color="currentColor"
                  />
                </div>
                <div className="overflow-hidden w-full">
                  <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                    شماره شبا
                  </span>
                  {
                    loading
                      ? <Skeleton className='h-[15px] w-full' />
                      : (
                        <span dir='ltr' className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                          {`IR ${numberSeparation(getData.data?.iban_number || "************************", ' - ', 4)}`}
                        </span>
                      )
                  }
                </div>
              </div>
              <button
                disabled={loading}
                className="size-[45px] shrink-0 flex items-center justify-center lg:rounded-md rounded-[10px] transition-all duration-500 bg-gray-100/50 hover:bg-gray-100 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => hanldeClipboardCopy(getData.data?.card_number || "************************")}
              >
                <IconsaxIcons
                  name="DocumentCopy"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
