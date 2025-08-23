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
import {
  TicketsContextPropsType,
  TicketsContextType,
} from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import MessageItem from './messageItem';
import useLocalStorageState from 'use-local-storage-state';
import toast from '../ui/customSonner/toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { AccordionTrigger } from '@radix-ui/react-accordion';
import moment from 'jalali-moment';
import { useMediaQuery } from '@/hooks';
import ExitTicketsDialog from './dialog/exitTicketsDialog';

// Creating and exporting TicketsContext component as default
export default function TicketsContext({
  tickets,
  className,
}: TicketsContextPropsType): ReactNode {
  // Defining hooks
  const [rightLayoutSize, setRightLayoutSize] = useState<'sm' | 'lg'>('lg');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [exitModalOpened, setExitModalOpened] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<number | undefined>();
  const [replyTo, setReplyTo] = useState<string>('');
  const [replyMessage, setReplyMessage] = useState<string>('');
  const isMobile = useMediaQuery('(max-width: 1024px)');

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
  const allTickets: TicketsContextType[] = [
    ...tickets.currentTickets,
    ...tickets.previousTickets.flatMap((p) => p.tickets),
  ];

  const foundedTicketItem = allTickets.find(
    (item) => item.id === selectedTicket,
  );

  // Using useEffect to clear reply things
  useEffect(() => {
    setReplyTo('');
    setReplyMessage('');
  }, [foundedTicketItem]);

  // Returning JSX
  if (isMobile) {
    return (
      <div>
        <SelectDepartmentDialog
          isOpened={modalOpened}
          closeFn={() => setModalOpened(false)}
        />
        <ExitTicketsDialog
          isOpened={exitModalOpened}
          closeFn={() => setExitModalOpened(false)}
        />
        <div className="flex items-center justify-between gap-3 bg-white border-b border-b-black/10 px-[12px] h-[50px]">
          <span className="text-cs85 font-bold text-black/70 text-right truncate block flex-1">
            چت تایم سفرنامه
          </span>
          <div className="flex items-center justify-between gap-3 shrink-0">
            <button
              className="text-cs-blue"
              onClick={() => setModalOpened(true)}
            >
              <IconsaxIcons
                className="size-[20px]"
                name="AddSquare"
                color="currentColor"
              />
            </button>
            <button
              className="text-black transition-all duration-500 disabled:opacity-50"
              onClick={() => setExitModalOpened(true)}
            >
              <IconsaxIcons
                className="size-[20px]"
                name="LogoutCurve"
                color="currentColor"
              />
            </button>
          </div>
        </div>
        <div className="px-[12px] py-[10px] flex flex-col w-full overflow-x-hidden overflow-y-auto relative custom-scrollbar h-[calc(100dvh-125px)] bg-white">
          {tickets.currentTickets.length === 0 ? (
            <div className=" absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] pointer-events-none text-black/50 overflow-auto custom-scrollbar">
              <div>
                <IconsaxIcons
                  name="EmojiSad"
                  color="currentColor"
                  className="size-32 mb-5 block mx-auto"
                />
                <p className="text-black/75 text-cs07 font-normal text-center block">
                  مشتری گرامی صفحه چت برای شما قفل میباشد، برای استارت ابتدا
                  دپارتمان خود را انتخاب نمایید
                </p>
              </div>
            </div>
          ) : (
            tickets.currentTickets.map((item, index) => (
              <TicketItem
                key={index}
                onClick={() => setSelectedTicket(item.id)}
                className={cn(
                  `bg-white hover:bg-white px-0 rounded-none`,
                  tickets.currentTickets.length !== index + 1 &&
                    'border-b border-b-black/10',
                )}
                data={{
                  createdAt: item.user.lastSeen,
                  subTitle: item.user.status,
                  title: item.user.name,
                  img: item.user.img,
                }}
              />
            ))
          )}
        </div>
        <div className="border-t border-t-black/10 grid grid-cols-3 gap-5 h-[75px] place-items-center bg-gray-100">
          <button className="text-black/50">
            <IconsaxIcons
              className="size-[20px] mx-auto block mb-1"
              name="Setting2"
              color="currentColor"
            />
            <span className="text-cs75 font-medium text-current truncate text-center block">
              تنظیمات چت
            </span>
          </button>
          <button className="text-black">
            <IconsaxIcons
              className="size-[20px] mx-auto block mb-1"
              name="Text"
              variant="Bold"
              color="currentColor"
            />
            <span className="text-cs65 font-medium text-current truncate text-center block">
              تنظیمات چت
            </span>
          </button>

          <button className="text-black/50">
            <IconsaxIcons
              className="size-[20px] mx-auto block mb-1"
              name="MessageText"
              color="currentColor"
            />
            <span className="text-cs65 font-medium text-current truncate text-center block">
              تنظیمات چت
            </span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ExitTicketsDialog
          isOpened={exitModalOpened}
          closeFn={() => setExitModalOpened(false)}
        />
        <SelectDepartmentDialog
          isOpened={modalOpened}
          closeFn={() => setModalOpened(false)}
        />
        <div
          data-size={rightLayoutSize}
          className={cn(
            'bg-white flex overflow-hidden group h-dvh w-full',
            className,
          )}
        >
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
              {!foundedTicketItem ? (
                <span className="text-cs95 font-bold text-black text-start truncate block flex-1">
                  بخش دپارتمان سفرنامه
                </span>
              ) : foundedTicketItem && foundedTicketItem.status === 'open' ? (
                <span className="text-cs95 font-bold text-black text-start truncate block flex-1">
                  {foundedTicketItem.user.name}
                </span>
              ) : (
                <p className="text-cs95 font-bold text-black text-start truncate block flex-1">
                  {foundedTicketItem.user.name}{' '}
                  <span className="text-cs-red">(تیکت منقضی شده)</span>
                </p>
              )}
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
              isClosed={foundedTicketItem?.status === 'closed'}
              reportTypes={foundedTicketItem?.report}
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
            <div className="shrink-0 border-b border-b-black/10 py-[12px]  overflow-auto custom-scrollbar h-[200px]">
              <div className="px-[12px]">
                <span className="text-cs75 font-medium text-black/70 text-right truncate block mb-3">
                  تیکت های حال حاضر
                </span>
              </div>
              <div className="flex flex-col gap-3 px-[12px]">
                {tickets.currentTickets.map((item, index) => (
                  <TicketItem
                    key={index}
                    onClick={() => setSelectedTicket(item.id)}
                    className={selectedTicket === item.id ? 'bg-gray-100' : ''}
                    newNotifications={10}
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
            {tickets.previousTickets.length === 0 ? (
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
              <div className="h-full overflow-auto custom-scrollbar py-[12px]">
                <div className="px-[12px]">
                  <span className="text-cs75 font-medium text-black/70 text-right truncate block mb-3">
                    تیکت های گذشته
                  </span>
                </div>
                <Accordion collapsible type="single">
                  {tickets.previousTickets.map((item, index) => (
                    <AccordionItem
                      value={`previus-tickets-${index}`}
                      key={index}
                    >
                      <AccordionTrigger asChild>
                        <button className="flex items-center justify-between gap-3 px-[12px] py-[10px] bg-white transition-all duration-500 hover:bg-gray-100 w-full text-black/70 group">
                          <span className="text-cs75 font-medium text-current text-right truncate block flex-1">
                            تیکت های{' '}
                            {moment(item.date)
                              .locale('fa')
                              .format('jMMMM ماه jYYYY')}
                          </span>
                          <IconsaxIcons
                            name="ArrowLeft2"
                            className="size-4 transition-all duration-500 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-90"
                            color="currentColor"
                          />
                        </button>
                      </AccordionTrigger>
                      <AccordionContent className="p-[12px]">
                        {item.tickets.map((innerItem, innerIndex) => (
                          <TicketItem
                            key={innerIndex}
                            onClick={() => setSelectedTicket(innerItem.id)}
                            type="prevois"
                            className={
                              selectedTicket === innerItem.id
                                ? 'bg-gray-100'
                                : ''
                            }
                            data={{
                              createdAt: innerItem.user.lastSeen,
                              subTitle: innerItem.user.status,
                              title: innerItem.user.name,
                              img: innerItem.user.img,
                            }}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            <div className="p-[12px] shrink-0">
              <Button
                onClick={() => setExitModalOpened(true)}
                className="flex items-center justif-center px-[12px] py-[18px] bg-cs-red/10 !text-cs-red w-full transition-all duration-500 hover:bg-cs-red/20 rounded-lg gap-3"
              >
                <IconsaxIcons
                  className="size-[20px]"
                  name="LogoutCurve"
                  color="currentColor"
                />
                <span className="text-cs65 font-semibold text-center truncate text-current">
                  خروج از تیکت, بازگشت به صفحه
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
