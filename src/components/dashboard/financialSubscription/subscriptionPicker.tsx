// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { SubscriptionPickerPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useState } from 'react';
import { addCommas } from '@persian-tools/persian-tools';
import BuySubscriptionDialog from './dialog/buySubscriptionDialog';
import { Swiper, SwiperSlide } from 'swiper/react';

// Defining dummy data
const data: {
  name: string;
  smallDescrption: string;
  monthlyPrice: number;
  colorName: string;
  features: string[];
  color: string;
}[] = [
    {
      name: "پلن پایه",
      smallDescrption: "برای استفاده عادی روزانه",
      monthlyPrice: 120000,
      colorName: "آبی",
      color: "#2563eb",
      features: [
        "دسترسی به امکانات اصلی",
        "پشتیبانی عادی",
        "آپدیت های ماهانه",
        "سرعت متوسط"
      ]
    },
    {
      name: "پلن حرفه‌ای",
      smallDescrption: "برای کسب‌وکارهای کوچک",
      monthlyPrice: 350000,
      colorName: "بنفش",
      color: "#9333ea",
      features: [
        "تمام قابلیت‌های پلن پایه",
        "پشتیبانی سریع",
        "سرعت بالا",
        "امکان مدیریت چند کاربر",
        "آپدیت‌های هفتگی"
      ]
    },
    {
      name: "پلن سازمانی",
      smallDescrption: "ویژه تیم‌ها و شرکت‌ها",
      monthlyPrice: 950000,
      colorName: "سبز",
      color: "#16a34a",
      features: [
        "پشتیبانی ۲۴ ساعته",
        "آپدیت‌های فوری",
        "امنیت پیشرفته",
        "امکان اتصال به API",
        "پهنای باند نامحدود"
      ]
    }
  ];

// Creating and exporting SubscriptionPicker component as default
export default function SubscriptionPicker({
  className,
  disabled = false
}: SubscriptionPickerPropsType): JSX.Element {
  // Defininig hooks
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [activeSwiperSlideIndex, setActiveSwiperSlideIndex] =
    useState<number | undefined>(disabled ? undefined : 0);

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden',
        disabled && "opacity-50 pointer-events-none select-none",
        className,
      )}
    >
      <BuySubscriptionDialog
        id={activeSwiperSlideIndex ? 1 : 0}
        open={modalOpened}
        onOpenChange={setModalOpened}
      />
      <div className="flex items-center justify-between gap-3 lg:p-4 p-[14px] border-b border-b-black/10">
        <div className='flex items-center justify-start gap-3  flex-1 overflow-hidden'>
          <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
            <IconsaxIcons
              name="Crown1"
              className="w-[20px] h-[20px]"
              color="currentColor"
            />
          </div>
          <div className="overflow-hidden w-full">
            <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
              خرید و تمدید اشتراک
            </span>
            <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
              برای خرید و تمدید اشتراک خود در سفرنامه 24 از این قسمت استفاده کنید.
            </p>
          </div>
        </div>
        <button
          className="lg:w-[125px] w-fit shrink-0 lg:text-sm text-xs lg:px-6 px-3 lg:h-[45px] h-[38px] flex items-center justify-center rounded-md disabled:text-black border disabled:border-black/10 disabled:bg-gray-50 transition-all duration-500 text-cs75 font-medium truncate bg-green-500 border-green-500 hover:bg-green-600 text-white"
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setModalOpened(true)}
        >
          خرید اشتراک
        </button>
      </div>
      <div className="lg:p-4 p-[14px] grid lg:grid-cols-9 gap-4">
        <div className="lg:h-[230px] h-[190px] bg-gray-200 rounded-xl overflow-hidden lg:col-span-4 flex items-center justify-center px-8">
          {
            disabled || !disabled && data.length === 0
              ? (
                <div className='rounded-xl p-4 text-white flex flex-col items-center justify-between gap-3 bg-gray-300 from-transparent bg-gradient-to-bl to-cs-red h-[175px] w-full'>
                  <div className='w-full'>
                    <span className="text-left truncate block flex-1 text-white font-semibold text-cs75">
                      اشتراک سفرنامه 24
                    </span>
                  </div>
                  <div className='w-full'>
                    <span className="text-left truncate block text-white font-medium text-cs95 mb-1.5">
                      _
                    </span>
                    <span className="text-left truncate block text-white font-semibold text-cs85">
                      _
                    </span>
                  </div>
                </div>
              ) : (
                <Swiper
                  className='h-[175px] w-full !overflow-visible'
                  spaceBetween={20}
                  enabled={!disabled}
                  onSlideChange={(swiper) => {
                    const activeIndex = swiper.activeIndex;
                    setActiveSwiperSlideIndex(activeIndex);
                  }}
                >
                  {
                    data.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          style={{
                            background: item.color,
                            backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0, 0.5) , ${item.color})`,
                          }}
                          className='rounded-xl p-4 text-white flex flex-col items-center justify-between gap-3 bg-gray-300 from-transparent bg-gradient-to-bl h-full w-full' >
                          <div className='w-full'>
                            <span className="text-left truncate block flex-1 text-white font-semibold text-cs75">
                              اشتراک سفرنامه 24
                            </span>
                          </div>
                          <div className='w-full'>
                            <span className="text-left truncate block text-white font-medium text-cs95 mb-1.5">
                              {item.name}
                            </span>
                            <span className="text-left truncate block text-white font-semibold text-cs85">
                              {`${addCommas(item.monthlyPrice)} تومان`}
                            </span>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              )}
        </div>
        <div className="lg:col-span-5 grid lg:grid-cols-2 gap-4">
          <div className='space-y-4'>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="Tag"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  نام
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  {activeSwiperSlideIndex !== undefined ? data[activeSwiperSlideIndex].name : "-"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="InfoCircle"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  توضیحات
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  {activeSwiperSlideIndex !== undefined ? data[activeSwiperSlideIndex].smallDescrption : "-"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="Money"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  هزینه ماهانه
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  {activeSwiperSlideIndex !== undefined ? `${addCommas(data[activeSwiperSlideIndex].monthlyPrice)} تومان` : "-"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="ColorSwatch"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  رنگ
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  {activeSwiperSlideIndex !== undefined ? data[activeSwiperSlideIndex].colorName : "-"}
                </span>
              </div>
            </div>
          </div>
          <div className='space-y-4 flex items-center justify-between flex-col lg:h-[230px]'>
            <div className="flex items-center justify-start gap-3 w-full">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="Grid1"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right">
                اپشن ها
              </span>
            </div>
            {
              activeSwiperSlideIndex !== undefined && (
                <ul className='w-full space-y-4 list-inside list-disc lg:h-full overflow-auto custom-scrollbar'>
                  {
                    data[activeSwiperSlideIndex].features.map((item, index) => (
                      <li className="text-right truncate text-black/75 lg:text-cs75 text-[12px] lg:font-semibold font-bold" key={index}>
                        {item}
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </div>
        </div>
      </div>
    </div >
  );
}
