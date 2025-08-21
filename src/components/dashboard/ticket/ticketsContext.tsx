// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import Avatar from '../../../../public/image/avatar/1.jpg';
import Image from 'next/image';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import SettingItem from './settingItem';
import DateSeprator from './dateSeprator';
import SendMessage from './sendMessage';
import { Button } from '@/components/ui/button';
import TicketItem from './ticketItem';
import EmptyImage from '../../../../public/image/empty.png';
import SelectDepartmentDialog from './dialog/selectDepartmentDialog';
import { TicketsContextPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import MessageItem from './messageItem';
import useLocalStorageState from 'use-local-storage-state';
import toast from '../ui/customSonner/toast';

// Creating and exporting TicketsContext component as default
export default function TicketsContext({
  tickets,
  className,
}: TicketsContextPropsType): ReactNode {
  // Defining hooks
  const [rightLayoutSize, setRightLayoutSize] = useState<'sm' | 'lg'>('lg');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<number | undefined>();
  const [replyTo, setReplyTo] = useState<string>('');
  const [replyMessage, setReplyMessage] = useState<string>('');

  // Defining local storage items
  const [walpaper] = useLocalStorageState<string>('ticketWalpaper', {
    defaultValue: '#F7F8F9',
  });

  const theme = useLocalStorageState<string>('ticketTheme', {
    defaultValue: '#548BF6',
  });

  const [ticketNotifications, setTicketNotifications] =
    useLocalStorageState<boolean>('ticketNotifications', {
      defaultValue: false,
    });

  // Defining variables
  const foundedTicketItem = tickets.find((item) => item.id === selectedTicket);

  // Using useEffect to clear reply things
  useEffect(() => {
    setReplyTo('');
    setReplyMessage('');
  }, [foundedTicketItem]);

  // Returning JSX
  return (
    <div>
      <div
        data-size={rightLayoutSize}
        className={cn(
          'bg-white rounded-lg border border-black/10 flex overflow-hidden group h-dvh',
          className,
        )}
      >
        <SelectDepartmentDialog
          isOpened={modalOpened}
          closeFn={() => setModalOpened(false)}
        />
        <div className="group-data-[size=sm]:w-[10%] group-data-[size=lg]:w-[25%] transition-all duration-500 overflow-auto custom-scrollbar">
          <div className="p-[24px] border-b border-black/10">
            <Image
              width={100}
              height={100}
              alt="پروفایل کاریر"
              src={
                foundedTicketItem?.user?.img
                  ? foundedTicketItem.user.img
                  : Avatar.src
              }
              className="group-data-[size=sm]:size-[50px] group-data-[size=lg]:size-[75px] aspect-square mb-4 block mx-auto transition-all duration-500 object-cover rounded-full"
            />
            <span className="text-cs95 font-bold text-black text-center truncate block">
              {foundedTicketItem ? foundedTicketItem.user.name : 'نامعلوم'}
            </span>
            {rightLayoutSize === 'lg' && (
              <span className="text-cs85 font-medium text-black/70 text-center truncate block  mt-1">
                {foundedTicketItem ? foundedTicketItem.user.role : 'نامعلوم'}
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
                subTitle={`${foundedTicketItem?.files.documents.length || 0} فایل`}
                title="داکیومنت"
                type="files"
                files={foundedTicketItem?.files.documents}
                size={rightLayoutSize}
                disabled={
                  !foundedTicketItem ||
                  foundedTicketItem.files.documents.length === 0
                }
              />
              <SettingItem
                type="files"
                files={foundedTicketItem?.files.images}
                icon="Image"
                subTitle={`${foundedTicketItem?.files.images.length || 0} فایل`}
                title="عکس"
                size={rightLayoutSize}
                disabled={
                  !foundedTicketItem ||
                  foundedTicketItem.files.images.length === 0
                }
              />
              <SettingItem
                icon="Microphone"
                subTitle={`${foundedTicketItem?.files.voices.length || 0} فایل`}
                title="صدا"
                type="files"
                files={foundedTicketItem?.files.voices}
                size={rightLayoutSize}
                disabled={
                  !foundedTicketItem ||
                  foundedTicketItem.files.voices.length === 0
                }
              />
              <SettingItem
                icon="VideoPlay"
                subTitle={`${foundedTicketItem?.files.videos.length || 0} فایل`}
                title="ویدیو"
                type="files"
                files={foundedTicketItem?.files.videos}
                size={rightLayoutSize}
                disabled={
                  !foundedTicketItem ||
                  foundedTicketItem.files.videos.length === 0
                }
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
                title="والپیپر"
                type="walpaper"
                size={rightLayoutSize}
                disabled={!foundedTicketItem}
              />
              <SettingItem
                icon="Bucket"
                title="رنگ چت تایم"
                type="theme"
                size={rightLayoutSize}
                disabled={!foundedTicketItem}
              />
            </div>
          </div>
        </div>
        <div className="border-x border-x-black/10 group-data-[size=sm]:w-[65%] group-data-[size=lg]:w-[50%] transition-all duration-500 p-[24px] flex flex-col gap-[24px]">
          <div className="flex items-center justify-between gap-3 shrink-0 w-full">
            <span className="text-cs95 font-bold text-black text-start truncate block flex-1">
              {foundedTicketItem
                ? foundedTicketItem.user.name
                : 'بخش دپارتمان سفرنامه'}
            </span>
            <div className="flex items-center justify-end gap-3 shrink-0">
              <button
                data-active={ticketNotifications}
                className="relative overflow-hidden transition-all duration-500 data-[active=true]:text-black data-[active=false]:text-gray-500"
                onClick={() => {
                  if (ticketNotifications) {
                    setTicketNotifications(false);
                    toast({
                      description:
                        'در صورت پیام به ادمین به شما نوتیفیکشن نخواهد امد.',
                      title: 'نوتیفیکشن قطع شد !',
                      theme: 'theme',
                    });
                  } else {
                    setTicketNotifications(true);
                    toast({
                      description:
                        'در صورت پیام به ادمین به شما نوتیفیکشن خواهد امد.',
                      title: 'نوتیفیکشن وصل شد !',
                      theme: 'green',
                    });
                  }
                }}
              >
                {!ticketNotifications && (
                  <div className="absolute left-[50%] -translate-x-[50%] top-0 w-[2px] h-full bg-current rotate-[45deg] scale-125" />
                )}
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
          <div
            style={{ background: walpaper }}
            className="p-[24px] flex flex-col gap-4 rounded-lg h-full w-full overflow-x-hidden overflow-y-auto relative custom-scrollbar"
          >
            <DateSeprator date={new Date().toISOString()} />
            {!foundedTicketItem ? (
              <div className=" absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] pointer-events-none text-gray-200 overflow-auto custom-scrollbar">
                <IconsaxIcons
                  name="EmojiSad"
                  color="currentColor"
                  className="size-32"
                />
              </div>
            ) : (
              foundedTicketItem.messages.map((item, index) => (
                <MessageItem
                  key={index}
                  setReply={(message, name) => {
                    setReplyTo(name);
                    setReplyMessage(message);
                  }}
                  data={item}
                />
              ))
            )}
          </div>
          <SendMessage
            className="shrink-0 w-full"
            disabled={!foundedTicketItem}
            clearReply={() => {
              setReplyMessage('');
              setReplyTo('');
            }}
            reply={{
              message: replyMessage,
              name: replyTo,
            }}
          />
        </div>
        <div className="w-[25%] flex flex-col">
          <div className="p-[24px] shrink-0 border-b border-b-black/10">
            <Button
              onClick={() => setModalOpened(true)}
              className="flex items-center justif-center px-[12px] py-[18px] bg-cs-blue/10 !text-cs-blue w-full transition-all duration-500 hover:bg-cs-blue/20 rounded-lg text-cs65 font-semibold text-center truncate"
            >
              ثبت تیکت جدید
            </Button>
          </div>
          <div className="shrink-0 border-b border-b-black/10 py-[24px]  overflow-auto custom-scrollbar h-[150px]">
            <div className="px-[24px]">
              <span className="text-cs75 font-medium text-black/70 text-right truncate block mb-3">
                تیکت های حال حاضر
              </span>
            </div>
            <div className="flex flex-col gap-3 px-[12px]">
              {tickets.map((item, index) => (
                <TicketItem
                  key={index}
                  onClick={() => setSelectedTicket(item.id)}
                  className={selectedTicket === item.id ? 'bg-gray-100' : ''}
                  data={{
                    createdAt: item.user.lastSeen,
                    subTitle: item.user.status,
                    title: item.user.name,
                    img: item.user.img,
                  }}
                />
              ))}
            </div>
          </div>
          {tickets.length === 0 ? (
            <div className="h-full flex items-center justify-center p-[24px] overflow-auto custom-scrollbar flex-col">
              <Image
                alt="هیچ لیست رزروی فعلا ندارید!"
                src={EmptyImage.src}
                width={500}
                height={500}
                className="w-[50%] aspect-square block mb-2 mx-auto"
              />
              <span className="block text-center w-full text-black text-[12px] mb-2 font-bold truncate">
                تیکت های گذشته
              </span>
              <span className="block text-center w-full text-gray-500 text-[10px] font-normal truncate">
                مشتری گرامی تیکتی در گذشته ندارید!
              </span>
            </div>
          ) : (
            <div className="h-full flex flex-col gap-3 p-[12px] overflow-auto custom-scrollbar">
              {tickets.map((item, index) => (
                <TicketItem
                  key={index}
                  onClick={() => setSelectedTicket(item.id)}
                  data={{
                    createdAt: item.user.lastSeen,
                    subTitle: item.user.role,
                    title: item.user.name,
                    img: item.user.img,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
