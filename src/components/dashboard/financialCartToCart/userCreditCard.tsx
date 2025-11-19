// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { UserCreditCardPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useState } from 'react';
import NormalInput from '../profile/normalInput';
import { getBankFromCard } from '@/utils/string';
import CardShowCase from './cardShowCase';
import { Swiper, SwiperSlide } from 'swiper/react';
import { numberSeparation } from '@/utils';

// Creating and exporting UserCreditCart component as default
export default function UserCreditCard({
  className,
  data,
  onValueChange,
  title
}: UserCreditCardPropsType): JSX.Element {
  // Defining hooks
  const [activeSwiperSlideIndex, setActiveSwiperSlideIndex] =
    useState<number>(0);

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
            name="Cards"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            {`حساب بانکی شما (${title})`}
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            میتوانید کارت بانکی دلخواه مدنظر خود را اضافه نمایید.
          </p>
        </div>
      </div>
      <div className="lg:p-4 p-[14px]">
        <div className="h-[190px] bg-gray-200 mb-4 rounded-xl py-4 px-8 overflow-hidden">
          {data.length === 0 ? (
            <CardShowCase
              className="h-[calc(190px-32px)]"
              data={{
                bankIcon: 'unknown',
                bankName: 'Safarnameh24',
                iban: '************************',
                number: '****************',
              }}
            />
          ) : (
            <Swiper
              spaceBetween={20}
              className="!overflow-visible"
              onSlideChange={(swiper) => {
                const activeIndex = swiper.activeIndex;
                setActiveSwiperSlideIndex(activeIndex);

                if (onValueChange) {
                  const creditCardInfo = data[activeIndex];
                  onValueChange(creditCardInfo);
                }
              }}
            >
              {data.map((item, index) => (
                <SwiperSlide dir="rtl" key={index}>
                  <CardShowCase
                    className="h-[calc(190px-32px)]"
                    data={{
                      bankIcon:
                        getBankFromCard(item.card_number)?.type || 'unknown',
                      bankName:
                        getBankFromCard(item.card_number)?.name || 'نامعلوم',
                      iban: item.iban || '************************',
                      number: item.card_number || '****************',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-start gap-4">
            <div className="flex-1 overflow-hidden">
              <span className="font-semibold text-cs07 text-black truncate text-right mb-1 block">
                بانک
              </span>
              <span className="font-medium text-cs07 text-black/70 truncate text-right block">
                {data.length === 0
                  ? 'سیستم بانکی ناشناخته است!'
                  : getBankFromCard(data[activeSwiperSlideIndex].card_number)
                    ?.name || 'سیستم بانکی ناشناخته است!'}
              </span>
            </div>
            <div className="shrink-0 flex items-center justify-between gap-2">
              {data.length !== 0 && (
                <button className="size-[40px] lg:rounded-md rounded-[10px] flex items-center justify-center bg-cs-red/5 transition-all duration-500 hover:bg-cs-red/10 text-cs-red">
                  <IconsaxIcons
                    name="Trash"
                    className="size-[18px]"
                    color="currentColor"
                  />
                </button>
              )}
              {data.length < 2 && (
                <button className="px-2.5 h-[40px] flex items-center justify-center gap-2 bg-white transition-all duration-500 hover:bg-gray-100/50 text-black rounded-md border border-black/10">
                  <IconsaxIcons
                    name="Add"
                    className="size-5"
                    color="currentColor"
                  />
                  <span className="truncate text-right block text-cs07 font-normal text-current">
                    ثبت کارت جدید
                  </span>
                </button>
              )}
            </div>
          </div>
          <div>
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              شماره کارت بانکی
            </span>
            <NormalInput
              type="text"
              className="h-[45px]"
              placeholder="16 رقم شماره کارت را وارد نمایید"
              disabled
              textLTR
              value={
                data.length !== 0
                  ? numberSeparation(
                    data[activeSwiperSlideIndex].card_number,
                    ' ',
                    4,
                  )
                  : ''
              }
              clearFn={() => {
                alert('X');
              }}
            />
          </div>
          <div>
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              شماره شبا کارت بانکی
            </span>
            <NormalInput
              type="text"
              className="h-[45px]"
              placeholder="24 رقم شماره شبا کارت را وارد نمایید"
              textLTR
              disabled
              value={
                data.length !== 0
                  ? numberSeparation(data[activeSwiperSlideIndex].iban, ' ', 4)
                  : ''
              }
              clearFn={() => {
                alert('X');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
