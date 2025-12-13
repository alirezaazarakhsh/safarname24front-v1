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
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETSubscriptionPackages } from '@/types/dashboard/api/get';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting SubscriptionPicker component as default
export default function SubscriptionPicker({
  className,
  disabled = false
}: SubscriptionPickerPropsType): JSX.Element {
  // Defininig hooks
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [activeSwiperSlideIndex, setActiveSwiperSlideIndex] =
    useState<number>(0);

  const getData = useApiQuery<GETSubscriptionPackages[]>({
    url: "/subscription/packages/",
    queryKey: ["subscription-packages"],
    options: {
      staleTime: Infinity,
      refetchInterval: Infinity,
    }
  });

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden',
        disabled && "opacity-50 pointer-events-none select-none",
        className,
      )}
    >
      {
        !getData.isLoading && !getData.isError && getData.data && (
          <BuySubscriptionDialog
            id={getData.data[activeSwiperSlideIndex].id}
            open={modalOpened}
            onOpenChange={setModalOpened}
          />
        )
      }
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
        {
          getData.isLoading
            ? <Skeleton className='lg:w-[125px] w-[200px] lg:h-[45px] h-[38px]' />
            : (
              <button
                className="lg:w-[125px] w-fit shrink-0 lg:text-sm text-xs lg:px-6 px-3 lg:h-[45px] h-[38px] flex items-center justify-center rounded-md disabled:text-black border disabled:border-black/10 disabled:bg-gray-50 transition-all duration-500 text-cs75 font-medium truncate bg-green-500 border-green-500 hover:bg-green-600 text-white"
                disabled={disabled || getData.isError || !getData.data}
                tabIndex={disabled ? -1 : 0}
                onClick={() => !disabled && setModalOpened(true)}
              >
                خرید اشتراک
              </button>
            )
        }
      </div>
      <div className="lg:p-4 p-[14px] grid lg:grid-cols-9 gap-4">
        <div className="lg:h-[230px] h-[190px] bg-gray-200 rounded-xl overflow-hidden lg:col-span-4 flex items-center justify-center px-8">
          {
            getData.isLoading
              ? <Skeleton className='h-[175px] w-full bg-black/50' />
              : disabled || !disabled && getData.data?.length === 0
                ? (
                  <div className='rounded-xl p-4 text-white flex-col items-center justify-between gap-3 bg-gray-300 from-transparent bg-gradient-to-bl to-cs-red h-[175px] w-full hidden'>
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
                ) : !getData.isError && getData.data && (
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
                      getData.data.map((item, index) => (
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
                                {`${addCommas(Number(item.monthly_cost))} تومان`}
                              </span>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                )
          }
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
                {
                  getData.isLoading
                    ? <Skeleton className='w-full h-[18px]' />
                    : getData.isError
                      ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">-</span>
                      ) : !getData.isLoading && !getData.isError && getData.data ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                          {activeSwiperSlideIndex !== undefined ? getData.data[activeSwiperSlideIndex].name : "-"}
                        </span>
                      ) : false
                }
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
                {
                  getData.isLoading
                    ? <Skeleton className='w-full h-[18px]' />
                    : getData.isError
                      ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">-</span>
                      ) : !getData.isLoading && !getData.isError && getData.data ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                          {activeSwiperSlideIndex !== undefined ? getData.data[activeSwiperSlideIndex].short_description : "-"}
                        </span>
                      ) : false
                }
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
                {
                  getData.isLoading
                    ? <Skeleton className='w-full h-[18px]' />
                    : getData.isError
                      ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">-</span>
                      ) : !getData.isLoading && !getData.isError && getData.data ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                          {activeSwiperSlideIndex !== undefined ? `${addCommas(Number(getData.data[activeSwiperSlideIndex].monthly_cost))} تومان` : "-"}
                        </span>
                      ) : false
                }
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
                {
                  getData.isLoading
                    ? <Skeleton className='w-full h-[18px]' />
                    : getData.isError
                      ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">-</span>
                      ) : !getData.isLoading && !getData.isError && getData.data ? (
                        <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                          {activeSwiperSlideIndex !== undefined ? getData.data[activeSwiperSlideIndex].upgrade_to_level : "-"}
                        </span>
                      ) : false
                }
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
              getData.isLoading
                ? (
                  <div className='w-full space-y-4 list-inside list-disc lg:h-full overflow-auto custom-scrollbar'>
                    {
                      [...new Array(5)].map((_, index) => <Skeleton key={index} className='h-[18px] w-full' />)
                    }
                  </div>
                ) : getData.isError ? false
                  : !getData.isLoading && !getData.isError && getData.data
                    ? activeSwiperSlideIndex !== undefined && (
                      <ul className='w-full space-y-4 list-inside list-disc lg:h-full overflow-auto custom-scrollbar'>
                        {
                          getData.data[activeSwiperSlideIndex].options.map((item, index) => (
                            <li className="text-right truncate text-black/75 lg:text-cs75 text-[12px] lg:font-semibold font-bold" key={index}>
                              {item.name}
                            </li>
                          ))
                        }
                      </ul>
                    )
                    : false
            }
          </div>
        </div>
      </div>
    </div >
  );
}
