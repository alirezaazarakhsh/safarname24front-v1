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

// Defining data's
const walpaperData: { label: string; color: string }[] = [
  { label: 'برفاب', color: '#BCBCBC' }, // Light Gray
  { label: 'مهتاب', color: '#F3F3F3' }, // Moonlight
  { label: 'سحر', color: '#F3F3F3' }, // Dawn
  { label: 'شبگیر', color: '#2A2A2A' }, // Dark Night
  { label: 'آسمان', color: '#CEDEEE' }, // Sky
  { label: 'ابرنقره', color: '#F7F8F9' }, // Silver Cloud
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
}: TicketsSettingItemPropsType): ReactNode {
  // Defining hooks
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
                  {subTitle}
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
          <DialogContent className="w-full max-w-[500px] gap-0 bg-gray-100">
            <DialogHeader className="flex items-center flex-row justify-between gap-3  mb-5">
              <DialogTitle className="text-cs85 font-bold truncate text-right block flex-1">
                لیست فایل های ذخیره شده
              </DialogTitle>
              <DialogClose className="shrink-0">
                <ICX className="size-3 -mt-1.5" fill="black" />
              </DialogClose>
            </DialogHeader>
            <div
              className="h-[250px] w-full overflow-y-scroll overflow-x-hidden custom-scrollbar pr-4"
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
          <DialogContent className="w-full max-w-[500px] gap-0 bg-gray-100">
            <DialogHeader className="flex items-center flex-row justify-between gap-3  mb-5">
              <div>
                <DialogTitle className="text-cs09 font-bold truncate text-right block flex-1 mb-2">
                  والپیپر
                </DialogTitle>
                <span className="text-cs75 font-bold truncate text-right block flex-1 text-gray-500">
                  {walpaperData.find((item) => item.color === walpaper)
                    ?.label || '-'}
                </span>
              </div>
              <DialogClose className="shrink-0">
                <ICX className="size-3 -mt-1.5" fill="black" />
              </DialogClose>
            </DialogHeader>
            <div className="w-full">
              <div
                className="p-[24px] flex flex-col gap-4 rounded-lg w-full bg-gray-100 h-[200px] overflow-y-scroll overflow-x-hidden custom-scrollbar mb-7"
                style={{ background: walpaper }}
              >
                {fakeMessages.map((item, index) => (
                  <MessageItem data={item} key={index} />
                ))}
              </div>
              <div className="grid grid-cols-6 gap-3">
                {walpaperData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setWalpaper(item.color)}
                    data-active={item.color === walpaper}
                    className="aspect-square flex p-1.5 rounded-lg relative overflow-hidden group"
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
            <DialogClose asChild>
              <button className="px-5 py-2.5 bg-black text-white text-center w-fit text-cs07 font-medium rounded-md mt-5">
                ذخیره اطلاعات
              </button>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
}
