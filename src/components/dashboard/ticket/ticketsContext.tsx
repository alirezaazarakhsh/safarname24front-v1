// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Avatar from '../../../../public/image/avatar/1.jpg';
import Image from 'next/image';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import SettingItem from './settingItem';
import DateSeprator from './dateSeprator';
import SendMessage from './sendMessage';

// Creating and exporting TicketsContext component as default
export default function TicketsContext(): ReactNode {
  // Defining hooks
  const [rightLayoutSize, setRightLayoutSize] = useState<'sm' | 'lg'>('lg');

  // Returning JSX
  return (
    <div
      data-size={rightLayoutSize}
      className="bg-white rounded-lg border border-black/10 flex overflow-hidden group"
    >
      <div className="group-data-[size=sm]:w-[10%] group-data-[size=lg]:w-[25%] transition-all duration-500">
        <div className="p-[24px] border-b border-black/10">
          <Image
            width={100}
            height={100}
            alt="پروفایل کاریر"
            src={Avatar.src}
            className="group-data-[size=sm]:size-[50px] group-data-[size=lg]:size-[75px] aspect-square mb-4 block mx-auto transition-all duration-500 object-cover rounded-full"
          />
          <span className="text-cs95 font-bold text-black text-center truncate block">
            نامعلوم
          </span>
          {rightLayoutSize === 'lg' && (
            <span className="text-cs85 font-medium text-black/70 text-center truncate block  mt-1">
              بخش دپارتمان سفرنامه
            </span>
          )}
        </div>
        <div className="border-b border-black/10 pb-[24px]">
          <div className="group-data-[size=sm]:p-3 group-data-[size=lg]:p-[24px]">
            <span className="text-cs75 font-medium text-black/70 text-right group-data-[size=sm]:text-center group-data-[size=lg]:text-right truncate block">
              فایل های ذخیره
            </span>
          </div>
          <div className="flex flex-col group-data-[size=sm]:gap-0 group-data-[size=lg]:gap-3 group-data-[size=lg]:px-[12px] group-data-[size=sm]:px-0">
            <SettingItem
              icon="DocumentText"
              subTitle="0 فایل - 0MB"
              title="داکیومنت"
              disabled
              size={rightLayoutSize}
            />
            <SettingItem
              disabled
              icon="Image"
              subTitle="0 فایل - 0MB"
              title="عکس"
              size={rightLayoutSize}
            />
            <SettingItem
              icon="Microphone"
              subTitle="0 فایل - 0MB"
              title="صدا"
              size={rightLayoutSize}
              disabled
            />
            <SettingItem
              icon="VideoPlay"
              subTitle="0 فایل - 0MB"
              title="ویدیو"
              size={rightLayoutSize}
              disabled
            />
          </div>
        </div>
        <div className="group-data-[size=sm]:pb-0 group-data-[size=lg]:pb-[24px]">
          <div className="group-data-[size=sm]:p-3 group-data-[size=lg]:p-[24px]">
            <span className="text-cs75 font-medium text-black/70 text-right group-data-[size=sm]:text-center group-data-[size=lg]:text-right truncate block">
              تنظیمات چت
            </span>
          </div>
          <div className="flex flex-col group-data-[size=sm]:gap-0 group-data-[size=lg]:gap-3 group-data-[size=lg]:px-[12px] group-data-[size=sm]:px-0">
            <SettingItem
              icon="MessageText"
              subTitle="گرادینت لایت یخ"
              title="والپیپر"
              size={rightLayoutSize}
              disabled
            />
            <SettingItem
              icon="Lock"
              title="رنگ چت تایم"
              subTitle="آبی اولترا"
              size={rightLayoutSize}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="border-x border-x-black/10 group-data-[size=sm]:w-[65%] group-data-[size=lg]:w-[50%] transition-all duration-500 p-[24px] flex flex-col gap-[24px]">
        <div className="flex items-center justify-between gap-3 shrink-0 w-full">
          <span className="text-cs95 font-bold text-black text-start truncate block flex-1">
            بخش دپارتمان سفرنامه
          </span>
          <div className="flex items-center justify-end gap-3 shrink-0">
            <button>
              <IconsaxIcons
                name="Notification"
                className="size-5"
                color="currentColor"
              />
            </button>
            <button
              onClick={() =>
                setRightLayoutSize((prev) => (prev === 'sm' ? 'lg' : 'sm'))
              }
            >
              <IconsaxIcons
                name="Grid4"
                className="size-5"
                color="currentColor"
              />
            </button>
          </div>
        </div>
        <div className="p-[24px] flex flex-col gap-4 rounded-lg h-full w-full bg-gray-50 overflow-auto relative">
          <div className=" absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] pointer-events-none text-gray-200">
            <IconsaxIcons
              name="EmojiSad"
              color="currentColor"
              className="size-32"
            />
          </div>
          <DateSeprator date={new Date().toISOString()} />
        </div>
        <SendMessage className="shrink-0 w-full" disabled />
      </div>
      <div className="w-[25%]" />
    </div>
  );
}
