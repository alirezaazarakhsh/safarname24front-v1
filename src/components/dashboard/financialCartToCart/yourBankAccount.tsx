// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode, useState } from 'react';
import CreditCard from './creditCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import InputAndLabel from './inputAndLabel';
import { YourBankAccountComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import Tooltip from '../ui/tooltip';

// Creating and exporting YourBankAccout component as default
export default function YourBankAccout({
  onChange,
  creditCards,
  selectedCard,
  setSelectedCard,
}: YourBankAccountComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className="bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden row-span-2 col-span-1">
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 lg:w-[38px] lg:h-[38px] w-[44px] h-[44px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Cards"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            حساب بانکی شما
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            میتوانید از دکمه ثبت جدید کارت مدنظر خود را اضافه نمایید.
          </p>
        </div>
      </div>
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] flex flex-col lg:gap-7 gap-[22px]">
        <div className="bg-gray-100 lg:rounded-lg rounded-[12px] lg:p-4 p-[14px] flex items-center justify-end overflow-hidden lg:mb-3 mb-2">
          <div className="w-[250px]">
            <Swiper
              spaceBetween={20}
              dir="ltr"
              style={{ overflow: 'visible' }}
              onSlideChange={(swiper) => {
                const lastSlideIndex = swiper.slides.length - 1;
                const activeIndex = swiper.activeIndex;

                // If Slider is on last index then set the selctedCard state to undefined becuase the last index is add button
                // Appending onChange Props to component
                if (activeIndex === lastSlideIndex) {
                  setSelectedCard(undefined);
                  onChange(undefined);
                } else {
                  setSelectedCard(creditCards[activeIndex]);
                  onChange(creditCards[activeIndex]);
                }
              }}
            >
              {creditCards.map((item, index) => (
                <SwiperSlide key={index}>
                  <CreditCard info={{ ...item }} />
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <div className="w-[250px] bg-black/10 border border-black/20 h-[125px] rounded-[10px] relative lg:p-3 p-[12px] flex items-center justify-center text-black/50 cursor-pointer">
                  <IconsaxIcons
                    name="Add"
                    className="w-[30px] h-[30px]"
                    color="currentColor"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="lg:mb-0 mb-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="lg:text-cs08 text-[12px] font-semibold block text-right truncate w-full overflow-hidden text-black lg:mb-2 mb-1">
                بانک
              </span>
              <span className="lg:text-cs07 text-[10px] font-normal block text-right truncate w-full overflow-hidden text-black/50">
                {selectedCard
                  ? selectedCard.name.persian
                  : 'سیستم بانکی ناشناخته است!'}
              </span>
            </div>
            <div className="flex items-center justify-end gap-3 shrink-0">
              {selectedCard && (
                <Button
                  className={
                    'transition-all duration-500 lg:rounded-lg rounded-[7px] gap-2 flex items-center justify-center lg:p-3 aspect-square border-cs-red text-cs-red bg-cs-red/10 hover:bg-cs-red/20 lg:h-auto lg:w-auto w-[40px] h-[40px]'
                  }
                >
                  <IconsaxIcons
                    name={'Trash'}
                    color="currentColor"
                    className="h-[20px] w-[20px]"
                  />
                </Button>
              )}
              {creditCards.length >= 2 ? (
                <Tooltip content="حداکثر ایجاد کردن کارت بانکی 2 عدد میباشد.">
                  <Button
                    disabled
                    className={
                      'transition-all duration-500 lg:rounded-lg rounded-[7px] gap-2 flex items-center justify-center lg:px-3 lg:py-3 px-[12px] oy-0 lg:h-auto h-[40px] bg-white border border-black/10 text-black/50 hover:bg-black/5 disabled:opacity-100'
                    }
                  >
                    <span className="font-normal  truncate block w-full text-right lg:text-xs text-[12px] text-current">
                      تعداد کارت شما پر شد!
                    </span>
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  className={
                    'transition-all duration-500 lg:rounded-lg rounded-[7px] gap-2 flex items-center justify-center lg:px-3 lg:py-3 px-[12px] oy-0 lg:h-auto h-[40px] bg-white border border-black/10 text-black/50 hover:bg-black/5 disabled:opacity-100'
                  }
                >
                  <IconsaxIcons
                    name={'Add'}
                    color="currentColor"
                    className="h-[20px] w-[20px]"
                  />
                  <span className="font-normal  truncate block w-full text-right lg:text-xs text-[12px] text-current">
                    ثبت جدید کارت
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:gap-4 gap-[18px]">
          <InputAndLabel
            placeholder="16 رقم شماره کارت را وارد نمایید"
            label="شماره کارت بانکی"
            type="text"
            isValid={selectedCard !== undefined}
            validation="ICON"
            validationType="icon"
            disabled
            value={
              selectedCard
                ? numberSeparation(selectedCard.number.card, ' - ', 4)
                : ''
            }
          />
          <InputAndLabel
            isValid={selectedCard !== undefined}
            placeholder="24 رقم شماره شبا کارت را وارد نمایید"
            disabled
            label="شماره شبا کارت بانکی"
            type="text"
            validation="ICON"
            validationType="icon"
            value={
              selectedCard
                ? numberSeparation(selectedCard.number.shaba, ' - ', 4)
                : ''
            }
          />
        </div>
      </div>
    </div>
  );
}
