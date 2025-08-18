// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import Avatar from '../../../../public/image/avatar/1.jpg';
import Image from 'next/image';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Creating and exporting tickets page as default
export default function TicketsPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px]">
      <div className="bg-white rounded-lg border border-black/10 grid grid-cols-3 overflow-hidden">
        <div>
          <div className="p-[24px] border-b border-black/10 flex flex-col items-center justify-center">
            <Image
              width={100}
              height={100}
              alt="پروفایل کاریر"
              src={Avatar.src}
              className="size-[75px] aspect-square mb-4"
            />
            <span className="text-cs95 font-bold text-black text-center truncate block mb-1">
              نامعلوم
            </span>
            <span className="text-cs85 font-medium text-black/70 text-center truncate block">
              بخش دپارتمان سفرنامه
            </span>
          </div>
          <div className="border-b border-black/10 pb-[24px]">
            <div className="p-[24px] pb-0 mb-[24px]">
              <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                فایل های ذخیره
              </span>
            </div>
            <div className="flex flex-col gap-2 px-[12px]">
              <button className="flex items-center justify-between gap-3 w-full bg-white hover:bg-gray-100 transition-all duration-500 rounded-lg p-[12px]">
                <div className="flex items-center justify-start flex-1 gap-3">
                  <div className="size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0">
                    <IconsaxIcons
                      name="DocumentText"
                      className="size-5"
                      color="currentColor"
                    />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
                      داکیومنت
                    </span>
                    <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                      0 فایل - 0MB
                    </span>
                  </div>
                </div>
                <div className="text-black shrink-0">
                  <IconsaxIcons
                    name="Lock"
                    className="size-4"
                    color="currentColor"
                  />
                </div>
              </button>
              <button className="flex items-center justify-between gap-3 w-full bg-white hover:bg-gray-100 transition-all duration-500 rounded-lg p-[12px]">
                <div className="flex items-center justify-start flex-1 gap-3">
                  <div className="size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0">
                    <IconsaxIcons
                      name="Image"
                      className="size-5"
                      color="currentColor"
                    />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
                      عکس
                    </span>
                    <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                      0 فایل - 0MB
                    </span>
                  </div>
                </div>
                <div className="text-black shrink-0">
                  <IconsaxIcons
                    name="Lock"
                    className="size-4"
                    color="currentColor"
                  />
                </div>
              </button>
              <button className="flex items-center justify-between gap-3 w-full bg-white hover:bg-gray-100 transition-all duration-500 rounded-lg p-[12px]">
                <div className="flex items-center justify-start flex-1 gap-3">
                  <div className="size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0">
                    <IconsaxIcons
                      name="Microphone"
                      className="size-5"
                      color="currentColor"
                    />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
                      صدا
                    </span>
                    <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                      0 فایل - 0MB
                    </span>
                  </div>
                </div>
                <div className="text-black shrink-0">
                  <IconsaxIcons
                    name="Lock"
                    className="size-4"
                    color="currentColor"
                  />
                </div>
              </button>
              <button className="flex items-center justify-between gap-3 w-full bg-white hover:bg-gray-100 transition-all duration-500 rounded-lg p-[12px]">
                <div className="flex items-center justify-start flex-1 gap-3">
                  <div className="size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0">
                    <IconsaxIcons
                      name="VideoPlay"
                      className="size-5"
                      color="currentColor"
                    />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
                      ویدیو
                    </span>
                    <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                      0 فایل - 0MB
                    </span>
                  </div>
                </div>
                <div className="text-black shrink-0">
                  <IconsaxIcons
                    name="Lock"
                    className="size-4"
                    color="currentColor"
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="pb-[24px]">
            <div className="p-[24px] pb-0 mb-[24px]">
              <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                تنظیمات چت
              </span>
            </div>
            <div className="flex flex-col gap-2 px-[12px]">
              <button className="flex items-center justify-between gap-3 w-full bg-white hover:bg-gray-100 transition-all duration-500 rounded-lg p-[12px]">
                <div className="flex items-center justify-start flex-1 gap-3">
                  <div className="size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0">
                    <IconsaxIcons
                      name="MessageText"
                      className="size-5"
                      color="currentColor"
                    />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
                      والپیپر
                    </span>
                    <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                      گرادینت لایت یخ
                    </span>
                  </div>
                </div>
                <div className="text-black shrink-0">
                  <IconsaxIcons
                    name="Lock"
                    className="size-4"
                    color="currentColor"
                  />
                </div>
              </button>
              <button className="flex items-center justify-between gap-3 w-full bg-white hover:bg-gray-100 transition-all duration-500 rounded-lg p-[12px]">
                <div className="flex items-center justify-start flex-1 gap-3">
                  <div className="size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0">
                    <IconsaxIcons
                      name="Bucket"
                      className="size-5"
                      color="currentColor"
                    />
                  </div>
                  <div>
                    <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
                      رنگ چت تایم
                    </span>
                    <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                      آبی اولترا
                    </span>
                  </div>
                </div>
                <div className="text-black shrink-0">
                  <IconsaxIcons
                    name="Lock"
                    className="size-4"
                    color="currentColor"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="border-x border-x-black/10"></div>
        <div />
      </div>
    </main>
  );
}
