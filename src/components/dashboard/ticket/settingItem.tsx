// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ICX } from '@/components/icons/ICX';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MessageItemPropsType,
  TicketsSettingItemPropsType,
} from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import FileItem from './fileItem';
import useLocalStorageState from 'use-local-storage-state';
import MessageItem from './messageItem';
import TicketsNavBar from './ticketsNavBar';
import { useMediaQuery } from '@/hooks';

// Defining data's
const walpaperData = [
  { label: 'برفاب', color: '#BCBCBC' }, // Light Gray
  { label: 'مهتاب', color: '#F3F3F3' }, // Moonlight
  { label: 'سحر', color: '#F3F3F3' }, // Dawn
  { label: 'شبگیر', color: '#2A2A2A' }, // Dark Night
  { label: 'آسمان', color: '#CEDEEE' }, // Sky
  { label: 'ابرنقره', color: '#F7F8F9' }, // Silver Cloud
];

const themeData = [
  { label: 'کهکشان', color: '#7B61C8' }, // Galaxy
  { label: 'آتشفشان', color: '#EF384A' }, // Volcano
  { label: 'جنگل', color: '#309B62' }, // Forest
  { label: 'سیاهچال', color: '#232323' }, // Dungeon
  { label: 'دریاچه', color: '#548BF6' }, // Lake
  { label: 'سنگواره', color: '#4C4C4C' }, // Fossil / Stone
];

const fakeMessages: MessageItemPropsType['data'][] = [
  {
    createdAt: new Date().toISOString(),
    from: 'user',
    message:
      'سلام خوبی.. من یه سوال خیلی مبهم داشتم درمورد سیستم عملکردی سفرنامه اگر بتونی کمک کنی ممنونت میشم.',
    type: 'text',
    answererName: 'شما',
  },
  {
    createdAt: new Date().toISOString(),
    from: 'answerer',
    message:
      'سلام خوبی من یه سوال خیلی مبهم داشتم درمورد سیستم عملکردی سفرنامه اگر بتونی کمک کنی ممنونت میشم. ',
    type: 'text',
    answererName: 'محمد علی کلی',
  },
  {
    createdAt: new Date().toISOString(),
    from: 'user',
    type: 'voice',
    message: '/randomMusic.mp3',
    answererName: 'شما',
  },
];

// Creating and exporting Tikcets settingItem component as default
export default function SettingItem({
  subTitle,
  title,
  className,
  disabled = false,
  onClick,
  size = 'lg',
  icon,
  type = 'files',
  files,
  mobileActiveTab,
  setMobileActiveTab,
}: TicketsSettingItemPropsType): ReactNode {
  // Defining hooks
  const [theme, setTheme] = useLocalStorageState<string>('ticketTheme');
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [walpaper, setWalpaper] =
    useLocalStorageState<string>('ticketWalpaper');

  // Defining inner component
  function SettingButton() {
    return (
      <DialogTrigger asChild disabled={disabled}>
        <button
          onClick={() => !disabled && onClick && onClick()}
          className={cn(
            'flex items-center justify-between gap-3 w-full transition-all duration-500 disabled:cursor-not-allowed cursor-pointer bg-white disabled:hover:bg-white hover:bg-gray-100 ',
            size === 'lg' ? 'p-[12px] rounded-lg' : 'py-2',
            className,
          )}
        >
          <div
            className={cn(
              'flex items-center overflow-hidden gap-3',
              size === 'lg' ? 'justify-start' : 'justify-center w-full',
            )}
          >
            <div
              className={
                'size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0'
              }
            >
              <IconsaxIcons
                name={icon}
                className="size-5"
                color="currentColor"
              />
            </div>
            {size === 'lg' && (
              <div className="overflow-hidden">
                <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
                  {title}
                </span>
                <span className="text-cs75 font-medium text-black/70 text-right truncate block">
                  {type === 'files'
                    ? subTitle
                      ? subTitle
                      : 'فایل ها'
                    : type === 'walpaper'
                      ? subTitle
                        ? subTitle
                        : walpaperData.find((item) => item.color === walpaper)
                            ?.label
                      : subTitle
                        ? subTitle
                        : themeData.find((item) => item.color === theme)?.label}
                </span>
              </div>
            )}
          </div>
          {size === 'lg' && (
            <div className="text-black shrink-0">
              <IconsaxIcons
                name={disabled ? 'Lock' : 'ArrowLeft2'}
                className="size-4"
                color="currentColor"
              />
            </div>
          )}
        </button>
      </DialogTrigger>
    );
  }

  // Conditiaonl rendering
  if (type === 'files') {
    return (
      <Dialog>
        <SettingButton />
        <DialogPortal>
          <DialogContent className="p-0 w-full lg:max-w-[400px] max-w-[100vw] lg:h-[50dvh] h-dvh gap-0 block lg:!rounded-2xl !rounded-none overflow-auto custom-scrollbar">
            <div className="px-6 py-5 border-b border-b-black/10 flex items-center justify-between gap-3 bg-white w-full shrink-0 lg:h-auto h-[50px]">
              <div className="flex items-center justify-start gap-3">
                <DialogClose asChild className="lg:hidden block">
                  <button className="shrink-0" type="button">
                    <IconsaxIcons
                      name="ArrowRight"
                      className="w-5 h-5 text-black"
                    />
                  </button>
                </DialogClose>
                <DialogTitle className="text-right text-[14px] font-bold text-[#2b2b2b] truncate w-full">
                  لیست فایل های ذخیره شده
                </DialogTitle>
              </div>
              <DialogClose asChild className="lg:block hidden">
                <button className="shrink-0" type="button">
                  <ICX className="w-3 h-3 text-black" fill="currentColor" />
                </button>
              </DialogClose>
            </div>
            <div
              className="lg:h-[calc(50dvh-62px)] h-[calc(100dvh-50px)] lg:block flex flex-col justify-between gap-3 overflow-y-auto overflow-x-hidden custom-scrollbar w-full p-6 bg-gray-100"
              dir="ltr"
            >
              <div className="flex flex-col gap-4" dir="rtl">
                {files?.map((item, index) => (
                  <FileItem file={item} key={index} />
                ))}
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  } else if (type === 'walpaper') {
    return (
      <Dialog>
        <SettingButton />
        <DialogPortal>
          <DialogContent className="p-0 w-full lg:max-w-[400px] max-w-[100vw] lg:h-auto h-dvh gap-0 block lg:!rounded-2xl !rounded-none overflow-auto custom-scrollbar">
            <div className="px-6 py-5 border-b border-b-black/10 flex items-center justify-between gap-3 bg-white w-full shrink-0 lg:h-auto h-[50px]">
              <div className="flex items-center justify-start gap-3">
                <DialogClose asChild className="lg:hidden block">
                  <button className="shrink-0" type="button">
                    <IconsaxIcons
                      name="ArrowRight"
                      className="w-5 h-5 text-black"
                    />
                  </button>
                </DialogClose>
                <div>
                  <DialogTitle className="text-right text-[14px] font-bold text-[#2b2b2b] truncate w-full">
                    والپیپر
                  </DialogTitle>
                  <span className="text-right text-[12px] font-normal text-[#2b2b2b] truncate lg:block hidden mt-1">
                    {walpaperData.find((item) => item.color === walpaper)
                      ?.label || '-'}
                  </span>
                </div>
              </div>
              <DialogClose asChild className="lg:block hidden">
                <button className="shrink-0" type="button">
                  <ICX className="w-3 h-3 text-black" fill="currentColor" />
                </button>
              </DialogClose>
            </div>
            <div className="lg:p-6 p-0 lg:h-auto h-[calc(100dvh-50px)] lg:block flex flex-col justify-between gap-3">
              <div className="w-full flex flex-col justify-between">
                <div className="p-6 lg:hidden flex items-center justify-between gap-3 w-full">
                  <div>
                    <span className="text-right text-[16px] font-bold text-[#2b2b2b] truncate w-full">
                      والپیپر
                    </span>
                    <span className="text-right text-[14px] font-normal text-[#2b2b2b] truncate mt-1 block">
                      {walpaperData.find((item) => item.color === walpaper)
                        ?.label || '-'}
                    </span>
                  </div>
                  <DialogClose asChild>
                    <button className="px-4 py-3 bg-black text-white text-center w-fit text-cs07 font-medium rounded-md">
                      ذخیره اطلاعات
                    </button>
                  </DialogClose>
                </div>
                <div
                  className="p-[24px] flex flex-col gap-4 lg:rounded-lg rounded-0 w-full lg:bg-white bg-gray-100 h-[200px] overflow-y-scroll overflow-x-hidden custom-scrollbar mb-7"
                  style={{ background: walpaper }}
                >
                  {fakeMessages.map((item, index) => (
                    <MessageItem data={item} key={index} />
                  ))}
                </div>
                <div className="grid grid-cols-6 lg:gap-3 gap-7 shrink-0 lg:px-0 px-6">
                  {walpaperData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setWalpaper(item.color)}
                      data-active={item.color === walpaper}
                      className="aspect-square flex lg:p-1.5 p-1 rounded-lg relative overflow-hidden group shrink-0"
                    >
                      <div
                        className="absolute top-0 left-0 w-full h-full transition-all duration-500 group-data-[active=false]:opacity-10 group-data-[active=true]:opacity-50"
                        style={{ background: item.color }}
                      />
                      <div
                        className="rounded-md cursor-pointer w-full z-10"
                        style={{ background: item.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {isMobile && mobileActiveTab && setMobileActiveTab && (
                <TicketsNavBar
                  className="shrink-0"
                  activeTabState={mobileActiveTab}
                  setActiveTabState={setMobileActiveTab}
                />
              )}
              <div className="lg:block hidden mt-5">
                <DialogClose asChild>
                  <button className="px-5 py-2.5 bg-black text-white text-center w-fit text-cs07 font-medium rounded-md">
                    ذخیره اطلاعات
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  } else if (type === 'theme') {
    return (
      <Dialog>
        <SettingButton />
        <DialogPortal>
          <DialogContent className="p-0 w-full lg:max-w-[400px] max-w-[100vw] lg:h-auto h-dvh gap-0 block lg:!rounded-2xl !rounded-none overflow-auto custom-scrollbar">
            <div className="px-6 py-5 border-b border-b-black/10 flex items-center justify-between gap-3 bg-white w-full shrink-0 lg:h-auto h-[50px]">
              <div className="flex items-center justify-start gap-3">
                <DialogClose asChild className="lg:hidden block">
                  <button className="shrink-0" type="button">
                    <IconsaxIcons
                      name="ArrowRight"
                      className="w-5 h-5 text-black"
                    />
                  </button>
                </DialogClose>
                <div>
                  <DialogTitle className="text-right text-[14px] font-bold text-[#2b2b2b] truncate w-full">
                    رنگ چت تایم
                  </DialogTitle>
                  <span className="text-right text-[12px] font-normal text-[#2b2b2b] truncate lg:block hidden mt-1">
                    {themeData.find((item) => item.color === theme)?.label ||
                      '-'}
                  </span>
                </div>
              </div>
              <DialogClose asChild className="lg:block hidden">
                <button className="shrink-0" type="button">
                  <ICX className="w-3 h-3 text-black" fill="currentColor" />
                </button>
              </DialogClose>
            </div>
            <div className="lg:p-6 p-0 lg:h-auto h-[calc(100dvh-50px)] lg:block flex flex-col justify-between gap-3">
              <div className="w-full flex flex-col justify-between">
                <div className="p-6 lg:hidden flex items-center justify-between gap-3 w-full">
                  <div>
                    <span className="text-right text-[16px] font-bold text-[#2b2b2b] truncate w-full">
                      رنگ چت تایم
                    </span>
                    <span className="text-right text-[14px] font-normal text-[#2b2b2b] truncate mt-1 block">
                      {themeData.find((item) => item.color === theme)?.label ||
                        '-'}
                    </span>
                  </div>
                  <DialogClose asChild>
                    <button className="px-4 py-3 bg-black text-white text-center w-fit text-cs07 font-medium rounded-md">
                      ذخیره اطلاعات
                    </button>
                  </DialogClose>
                </div>
                <div
                  className="p-[24px] flex flex-col gap-4 lg:rounded-lg rounded-0 w-full bg-gray-100 h-[200px] overflow-y-scroll overflow-x-hidden custom-scrollbar mb-7"
                  style={{ background: walpaper }}
                >
                  {fakeMessages.map((item, index) => (
                    <MessageItem data={item} key={index} />
                  ))}
                </div>
                <div className="grid grid-cols-6 lg:gap-3 gap-7 shrink-0 lg:px-0 px-6">
                  {themeData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setTheme(item.color)}
                      data-active={item.color === theme}
                      className="aspect-square flex lg:p-1.5 p-1 rounded-lg relative overflow-hidden group shrink-0"
                    >
                      <div
                        className="absolute top-0 left-0 w-full h-full transition-all duration-500 group-data-[active=false]:opacity-10 group-data-[active=true]:opacity-50"
                        style={{ background: item.color }}
                      />
                      <div
                        className="rounded-md cursor-pointer w-full z-10"
                        style={{ background: item.color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {isMobile && mobileActiveTab && setMobileActiveTab && (
                <TicketsNavBar
                  className="shrink-0"
                  activeTabState={mobileActiveTab}
                  setActiveTabState={setMobileActiveTab}
                />
              )}
              <div className="lg:block hidden mt-5">
                <DialogClose asChild>
                  <button className="px-5 py-2.5 bg-black text-white text-center w-fit text-cs07 font-medium rounded-md">
                    ذخیره اطلاعات
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
}
