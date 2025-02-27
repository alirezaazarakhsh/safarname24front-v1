// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MobileProfileComponentPropsType } from '@/types/dashboard/component';
import Image from 'next/image';
import ProfileImage from '../../../public/image/profile/1.webp';
import { IconsName } from '@/types';
import Link from 'next/link';
import IconsaxIcons from '../icons/iconsaxIcons';
import { ICLogOut } from '../icons/ICLogOut';
import { numberSeparation } from '@/utils';
import { ICArrowFlashRight } from '../icons/ICArrowFlashRight';

// Creating some data to render
const data: {
  type: 'containable' | 'single';
  icon: IconsName;
  title: string;
  subTitle: string;
  link?: `/dashboard/${string}` | string;
  containable?: {
    link: `/dashboard/${string}` | string;
    icon: IconsName;
    title: string;
    subTitle: string;
  }[];
}[] = [
  {
    type: 'single',
    icon: 'NotificationStatus',
    title: 'اعلان ها',
    subTitle: 'هیچ پیامی دریافت نکردید!',
    link: '/dashboard/announcments',
  },
  {
    type: 'single',
    icon: 'Category',
    title: 'داشبورد',
    subTitle: 'مشاهده و ویرایش اطلاعات شخصی',
    link: '/dashboard',
  },
  {
    type: 'single',
    icon: 'DocumentText',
    title: 'لیست رزرو من',
    subTitle: 'رزرواسیون سفرهای لیست شده من',
    link: '/dashboard/reservations',
  },
  {
    type: 'containable',
    icon: 'Wallet',
    title: 'بخش مالی',
    subTitle: 'دریافت اعتبار برای سفر، افزایش موجودی',
    containable: [
      {
        icon: 'CardSend',
        title: 'شارژ کیف پول',
        subTitle: 'افزایش اعتبار خرید هتل',
        link: '/dashboard/charge',
      },
      {
        icon: 'CardPos',
        title: 'کارت به کارت',
        subTitle: 'عملیات واریز وجه بنیانگذار',
        link: '/dashboard/card-to-card',
      },
      {
        icon: 'Cards',
        title: 'برداشت وجه',
        subTitle: 'عملیات برداشت وجه کیف پول',
        link: '/dashboard/take-out',
      },
      {
        icon: 'Receipt',
        title: 'فاکتور ها',
        subTitle: 'صدور واچر اختصاصی',
        link: '/dashboard/factors',
      },
    ],
  },
  {
    type: 'single',
    icon: 'Crown',
    title: 'باشگاه مشتریان',
    subTitle: 'امتیاز، جوایز دریافتی های ویژه',
    link: '/dashboard/customer-club',
  },
  {
    type: 'single',
    icon: 'MessageText',
    title: 'مدیریت تیکت ها',
    subTitle: 'مشاهده و ویرایش اطلاعات شخصی',
    link: '/dashboard/tickets',
  },
  {
    type: 'single',
    icon: 'Save2',
    title: 'علاقه مندی های من',
    subTitle: 'هتل و مقاله های جذاب ذخیره شده',
    link: '/dashboard/favorites',
  },
  {
    type: 'single',
    icon: 'Profile2User',
    title: 'مسافران من',
    subTitle: 'لیست هم سفر های من',
    link: '/dashboard/passangers',
  },
];

// Creating and exporting MobileProfile component as default
export default function MobileProfile({
  isOpened,
}: MobileProfileComponentPropsType): ReactNode {
  // Defining states of component
  const [componentScrolled, setComponentScrolled] = useState<boolean>(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | undefined>(
    undefined,
  );

  // Using useEffect to remove scroll feature from body while the component is opened
  useEffect(() => {
    const body = document.body;

    isOpened
      ? (body.style.overflow = 'hidden')
      : (body.style.overflow = 'auto');

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpened]);

  // Defining refrences
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Returning JSX
  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, top: '50%' }}
        initial={{ opacity: 0, top: '50%' }}
        animate={{ opacity: 1, top: 0 }}
        className="fixed z-30 left-0 pb-[100px] w-dvw h-dvh lg:hidden block overflow-auto scrollbar-hide bg-[#F9F9F9]"
        ref={containerRef}
        onScroll={() => {
            const containerElement = containerRef.current;
            if (containerElement) {
                const scrollTop = containerElement.scrollTop;
                (scrollTop === 0) 
                    ? setComponentScrolled(false) 
                    : setComponentScrolled(true)
            }
        }}
      >
        <div
            data-scrolled={componentScrolled}
            className="py-[16px] px-[24px] border-b border-b-black/20 flex items-center justify-between gap-3 data-[scrolled='false']:shadow-none data-[scrolled='true']:shadow-2xl shadow-black/20 sticky top-0 w-full left-0 z-50 data-[scrolled='false']:bg-transparent data-[scrolled='true']:bg-white transition-all duration-500"
        >
          <div className="flex items-center justify-start gap-[10px] w-full">
            <Image
              width={50}
              height={50}
              alt="عکس پروفایل شما"
              src={ProfileImage.src}
              className="w-[50px] h-[50px] aspect-square shrink-0 object-cover rounded-[8px]"
            />
            <div className="overflow-hidden w-full">
              <span className="text-[12px] truncate block w-full text-right text-black font-semibold mb-[6px]">
                پرهام رحیمی عزیز!
              </span>
              <span className="text-[12px] truncate block w-full text-right text-gray-500 font-semibold">
                Parhamrh20@gmail.com
              </span>
            </div>
          </div>
          <Link
            href="/dashboard/profile/edit"
            className="px-[18px] bg-blue-50 text-blue-500 h-[35px] rounded-[6px] flex items-center justify-center shrink-0"
          >
            <span className="text-[10px] font-bold text-current">
              ویرایش پروفایل
            </span>
          </Link>
        </div>
        <div className="p-[24px] flex flex-col gap-[15px]">
          <div className="p-[20px] bg-white border border-black/20 rounded-[14px]">
            <div className="mb-[20px] pb-[20px] border-b border-b-black/20 flex items-center justify-between gap-3">
              <div className="flex items-center justify-start gap-[10px] w-full overflow-hidden text-black">
                <IconsaxIcons
                  name="Wallet"
                  className="w-[20px] h-[20px] shrink-0 text-current"
                />
                <span className="text-[12px] truncate block w-full text-right font-semibold text-current">
                  موجودی شما :
                </span>
              </div>
              <p className="shrink-0 text-black">
                <span className="text-[16px] font-bold">{`${numberSeparation(253618148)} `}</span>
                <span className="text-[12px] font-semibold">تومان</span>
              </p>
            </div>
            <Link
              href="/dashboard/charge"
              className="flex justify-start items-center gap-[10px] text-blue-500 w-full"
            >
              <span className="block trucate text-current text-[10px] font-semibold">
                افزایش موجودی کیف پول
              </span>
              <ICArrowFlashRight className="text-current stroke-current w-[15px] h-[15px] shrink-0 rotate-180" />
            </Link>
          </div>
          {data.map((item, index) =>
            item.type === 'single' ? (
              <Link
                href={item.link || '#'}
                key={index}
                className="flex items-center justify-start w-full gap-[15px] p-[20px] bg-white border border-black/20 rounded-[14px]"
              >
                <div className="w-[43px] h-[43px] aspect-square rounded-[7px] flex items-center justify-center bg-gray-100 text-black relative">
                  {item.icon === 'NotificationStatus' && (
                    <>
                      <div className="absolute top-0 right-0 bg-cs-red w-2 h-2 z-10 rounded-full -translate-y-[50%] translate-x-[50%]" />
                      <div className="absolute top-[-4px] right-[-4px] bg-cs-red/40 duration-1000 delay-1000 animate-ping z-0 origin-center w-2 h-2 rounded-full" />
                    </>
                  )}
                  <IconsaxIcons
                    name={item.icon}
                    className="w-[20px] h-[20px] text-current"
                  />
                </div>
                <div className="overflow-hidden w-full">
                  <span className="text-[12px] truncate block w-full text-right text-black font-semibold mb-[6px]">
                    {item.title}
                  </span>
                  <span className="text-[10px] truncate block w-full text-right text-gray-500 font-semibold">
                    {item.subTitle}
                  </span>
                </div>
              </Link>
            ) : (
              <div
                key={index}
                data-opened={index === activeItemIndex}
                className="p-[20px] bg-white border border-black/20 rounded-[14px] overflow-hidden"
              >
                <button
                  onClick={() =>
                    activeItemIndex === index
                      ? setActiveItemIndex(undefined)
                      : setActiveItemIndex(index)
                  }
                  className="flex items-center justify-between w-full gap-3"
                >
                  <div className="flex items-center gap-[15px] justify-start">
                    <div className="w-[43px] h-[43px] rounded-[7px] flex items-center justify-center bg-gray-100 text-black aspect-square">
                      <IconsaxIcons
                        name={item.icon}
                        className="w-[20px] h-[20px] text-current"
                      />
                    </div>
                    <div className="overflow-hidden w-full">
                      <span className="text-[12px] truncate block w-full text-right text-black font-semibold mb-[6px]">
                        {item.title}
                      </span>
                      <span className="text-[10px] truncate block w-full text-right text-gray-500 font-semibold">
                        {item.subTitle}
                      </span>
                    </div>
                  </div>
                  <IconsaxIcons
                    name="ArrowDown2"
                    data-opened={index === activeItemIndex}
                    className="w-[14px] h-[14px] block shrink-0  transition-all duration-500 text-black data-[opened='false']:rotate-180 data-[opened='true']:rotate-0"
                  />
                </button>
                <motion.div
                  key={index}
                  layout
                  initial={{
                    height: 0,
                    opacity: 0,
                    paddingTop: 0,
                    marginTop: 0,
                  }}
                  animate={
                    index === activeItemIndex
                      ? {
                          height: 'auto',
                          opacity: 1,
                          paddingTop: 20,
                          marginTop: 20,
                        }
                      : { height: 0, opacity: 0, paddingTop: 0, marginTop: 0 }
                  }
                  exit={{ height: 0, opacity: 0, paddingTop: 0, marginTop: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-[20px] border-t border-t-black/20 overflow-hidden"
                >
                  {item.containable?.map(
                    (containableItem, containableIndex) => (
                      <Link
                        href={containableItem.link || '#'}
                        key={containableIndex}
                        tabIndex={index === activeItemIndex ? 0 : -1}
                        className="flex items-center justify-start w-full gap-[15px]"
                      >
                        <div className="w-[43px] h-[43px] rounded-[7px] flex items-center justify-center bg-gray-100 text-black aspect-square">
                          <IconsaxIcons
                            name={containableItem.icon}
                            className="w-[20px] h-[20px] text-current"
                          />
                        </div>
                        <div className="overflow-hidden w-full">
                          <span className="text-[12px] truncate block w-full text-right text-black font-semibold mb-[6px]">
                            {containableItem.title}
                          </span>
                          <span className="text-[10px] truncate block w-full text-right text-gray-500 font-semibold">
                            {containableItem.subTitle}
                          </span>
                        </div>
                      </Link>
                    ),
                  )}
                </motion.div>
              </div>
            ),
          )}
          <button className="flex items-center justify-center gap-[10px] rounded-[10px] bg-cs-red/10 text-cs-red p-[17px]">
            <ICLogOut className="shrink-0 w-[24px] h-[24px] text-current" />
            <span className="text-current text-[12px] font-semibold truncate block text-right">
              خروج از حساب کاربری
            </span>
          </button>
          <span className="text-center block text-[12px] font-semibold text-black truncate w-full">
            Version 1.1.25
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
