// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode, useState } from 'react';
import CreditCard from './creditCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import InputAndLabel from './inputAndLabel';
import { CreditCardComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';

// Defining fake credit cards data to render
const creditCards: {
  shabaNumber: string;
  number: string;
  name: string;
}[] = [
  {
    shabaNumber: '123412341234123412341234',
    number: '1234123412341234',
    name: 'Safarname24',
  },
  {
    shabaNumber: '123412341234123412341234',
    number: '1234123412341234',
    name: 'Safarname24',
  },
];

// Creating and exporting YourBankAccout component as default
export default function YourBankAccout(): ReactNode {
  // defining states of component
  const [selectedCard, setSelectedCard] = useState<
    CreditCardComponentPropsType | undefined
  >(creditCards[0]);

  // Returning JSX
  return (
    <div className="bg-white border border-black/10 rounded-lg overflow-hidden row-span-2 col-span-1">
      <div className="px-3 py-4 flex items-center justify-start border-b border-b-black/10 gap-3">
        <div className="shrink-0 w-[38px] h-[38px] rounded-md flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Cards"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1">
            حساب بانکی شما
          </span>
          <p className="lg:text-right text-left truncate text-black/50 lg:text-cs75 text-[16px] lg:font-semibold font-bold">
            میتوانید از دکمه ثبت جدید کارت مدنظر خود را اضافه نمایید.
          </p>
        </div>
      </div>
      <div className="px-3 py-4 flex flex-col gap-7">
        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-end overflow-hidden mb-3">
          <div className="w-[250px]">
            <Swiper
              spaceBetween={20}
              dir="ltr"
              style={{ overflow: 'visible' }}
              onSlideChange={(swiper) => {
                const lastSlideIndex = swiper.slides.length - 1;
                const activeIndex = swiper.activeIndex;

                // If Slider is on last index then set the selctedCard state to undefined becuase the last index is add button
                activeIndex === lastSlideIndex
                  ? setSelectedCard(undefined)
                  : setSelectedCard(creditCards[activeIndex]);
              }}
            >
              {creditCards.map((item, index) => (
                <SwiperSlide key={index}>
                  <CreditCard {...item} />
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <div className="w-[250px] bg-black/10 border border-black/20 h-[125px] rounded-lg relative p-3 flex items-center justify-center text-black/50 cursor-pointer">
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
        <div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-cs08 font-semibold block text-right truncate w-full overflow-hidden text-black mb-2">
                بانک
              </span>
              <span className="text-cs07 font-normal block text-right truncate w-full overflow-hidden text-black/50">
                {selectedCard?.name
                  ? selectedCard.name
                  : 'سیستم بانکی ناشناخته است!'}
              </span>
            </div>
            <div className="flex items-center justify-end gap-3 shrink-0">
              {selectedCard && (
                <Button
                  size="icon"
                  className={
                    'transition-all duration-500 rounded-lg gap-2 flex items-center justify-center p-3 border-cs-red text-cs-red bg-cs-red/10 hover:bg-cs-red/20'
                  }
                >
                  <IconsaxIcons
                    name={'Trash'}
                    color="currentColor"
                    className="h-[20px] w-[20px]"
                  />
                </Button>
              )}
              <Button
                className={
                  'transition-all duration-500 rounded-lg gap-2 flex items-center justify-center p-3 bg-white border border-black/10 text-black/50 hover:bg-black/5'
                }
              >
                <IconsaxIcons
                  name={'Add'}
                  color="currentColor"
                  className="h-[20px] w-[20px]"
                />
                <span className="font-normal  truncate block w-full text-right text-xs text-current">
                  ثبت جدید کارت
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
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
                ? numberSeparation(selectedCard.number, ' - ', 4)
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
                ? numberSeparation(selectedCard.shabaNumber, ' - ', 4)
                : ''
            }
          />
        </div>
      </div>
    </div>
  );
}
