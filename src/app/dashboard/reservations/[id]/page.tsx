// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, use } from 'react';
import HotelAcceptSection from '@/components/dashboard/reservationFactor/hotelAcceptSection';
import RoomsSection from '@/components/dashboard/reservationFactor/roomsSection';
import RulesSection from '@/components/dashboard/reservationFactor/rulesSection';
import Header from '@/components/dashboard/reservationFactor/header';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import {
  GETReservationFactor,
  GETReservationFactorSettings,
} from '@/types/dashboard/api/get';
import Loading from '@/components/dashboard/ui/loading';
import ErrorTable from '@/components/dashboard/api/errorTable';
import Image from 'next/image';
import TraiangleIcon from '../../../../../public/image/dashboardReservationFactor/traiangles.svg';
import LogoIcon from '../../../../../public/image/dashboardReservationFactor/logo.webp';
import Link from 'next/link';
import { Aubrey } from 'next/font/google';
import { cn } from '@/utils/utils';
import localFont from 'next/font/local';

// Defining fonts
const aubrey = Aubrey({
  subsets: ["latin"],
  weight: "400",
  display: "block",
  preload: true
})

const sepahboodFont = localFont({
  src: "../../../../../public/font/Sepahbod.otf",
  display: "block",
  weight: "500",
  preload: true
});

// Creating and exporting ReservationFactor page as default
export default function ReservationFactorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): ReactNode {
  // Defining hooks
  const { id } = use(params);
  const factorData = useApiQuery<GETReservationFactor>({
    url: `/hotel/reservation/invoices/${id}/`,
    queryKey: [`reservation-factor-${id}`],
    options: {
      refetchInterval: Infinity,
      staleTime: Infinity,
    },
  });

  const settingsData = useApiQuery<GETReservationFactorSettings>({
    url: '/hotel/reservation/factor/signator/',
    queryKey: [`reservation-factor-settings`],
    options: {
      enabled: !factorData.isLoading,
      refetchInterval: Infinity,
      staleTime: Infinity,
    },
  });

  // Conditional rendering
  if (
    factorData.isLoading ||
    factorData.isRefetching ||
    settingsData.isLoading ||
    settingsData.isRefetching
  ) {
    return (
      <main className="p-5 h-dvh w-dvw flex items-center justify-center fixed top-0 left-0">
        <Loading className="bg-cs-red" />
      </main>
    );
  } else if (factorData.isError || settingsData.isError) {
    return (
      <ErrorTable
        className="bg-transparent p-5 min-h-dvh h-auto"
        refetch={factorData.refetch}
      />
    );
  } else if (
    !factorData.isLoading &&
    !factorData.isError &&
    factorData.data &&
    !settingsData.isLoading &&
    !settingsData.isError &&
    settingsData.data
  ) {
    // Defining variables
    const data = factorData.data.reservation;
    const settings = settingsData.data.invoice_settings;

    // Returning JSX
    return (
      <>
        <div className="w-dvw bg-white text-black p-5 hidden print:block">
          <Image
            alt="Traiangle Icon"
            src={TraiangleIcon.src}
            width={500}
            height={500}
            className="w-[25%] -translate-y-1/4 h-auto fixed left-0 top-0 pointer-events-none select-none z-10"
            priority
            unoptimized
          />
          <Image
            alt="Traiangle Icon"
            src={TraiangleIcon.src}
            width={500}
            height={500}
            className="w-[25%] translate-y-1/4 h-auto fixed right-0 bottom-0 rotate-180 pointer-events-none select-none z-10"
            priority
            unoptimized
          />
          <div
            className="absolute right-5 top-5 pointer-events-none select-none z-20"
          >
            <Image
              alt="لوگو سفرنامه"
              priority
              unoptimized
              src={LogoIcon.src}
              width={500}
              height={500}
              className="w-[65px] mx-auto pointer-events-none select-none block"
            />
            <span className={cn('text-center font-medium text-black block text-cs07', aubrey.className)}>SAFARNAMEH24</span>
            <span className={cn('text-center font-normal text-black block text-cs07', sepahboodFont.className)}>سفرنامه ۲۴</span>
            <span className={'text-center font-normal text-black block text-cs06'}>شماره ثبت: 603443</span>
          </div>
          <Image
            alt="لوگو سفرنامه"
            priority
            unoptimized
            src={LogoIcon.src}
            width={500}
            height={500}
            className="w-[75%] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 contrast-0 pointer-events-none select-none z-0"
          />
          <div className="absolute bottom-5 left-5 py-3 z-20" dir="ltr">
            <div className="h-px w-full mb-3 bg-gradient-to-r from-transparent to-transparent via-black" />
            <div className="flex items-center justify-between gap-5 mb-2">
              <Link
                href={`tel:${settings.contact_number_1}`}
                className="flex items-center justify-start gap-2 w-fit text-cs-red"
              >
                <IconsaxIcons
                  name="Call"
                  color="currentColor"
                  variant="Bold"
                  className="size-5"
                />
                <span className="text-black font-light text-left text-xs flex-1 truncate block">
                  {settings.contact_number_1}
                </span>
              </Link>
              <Link
                href={`tel:${settings.contact_number_2}`}
                className="flex items-center justify-start gap-2 w-fit text-cs-red"
              >
                <IconsaxIcons
                  name="Call"
                  color="currentColor"
                  variant="Bold"
                  className="size-5"
                />
                <span className="text-black font-light text-left text-xs flex-1 truncate block">
                  {settings.contact_number_2}
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-end gap-2 text-cs-red">
              <span className="text-black font-light text-right text-xs flex-1 truncate block">
                {settingsData.data.invoice_settings.postal_address}
              </span>
              <IconsaxIcons
                name="Location"
                color="currentColor"
                className="size-5 shrink-0"
              />
            </div>
            <div className="h-px w-full mt-3 bg-gradient-to-r from-transparent to-transparent via-black" />
          </div>
          <div className="pt-[120px] h-auto absolute w-full right-0 p-5">
            <HotelAcceptSection
              className="z-10 relative"
              hotelName={`${settings.title} - هتل ${data.hotel.name}`}
              noMq
              data={{
                codePeigiri: data.tracking_code,
                createdAt: data.created_at,
                enterAt: data.check_in_date,
                exitAt: data.check_out_date,
                phoneNumber: data.reserver_phone,
                reserver: data.reserver_name,
              }}
            />
            <RoomsSection
              className="z-10 relative mt-5 pt-5 border-t border-t-black/50"
              noMq
              data={data.rooms.map((item) => ({
                info: {
                  enteranceHalfCharge: item.half_day_in,
                  exitHalfCharge: item.half_day_out,
                  hotelName: item.room_name,
                  meals: item.services,
                  reserver: data.reserver_name,
                  timeSpan: item.nights,
                },
                passenger: data.passengers
                  .filter((passenger) => passenger.name !== data.reserver_name)
                  .map((passenger) => passenger.name),
              }))}
            />
          </div>
        </div>
        <main className="lg:p-5 lg:pb-5 lg:pt-5 pt-[calc(28px+24px)] p-[24px] pb-[100px] print:hidden flex flex-col lg:gap-8 gap-[25px] bg-white">
          <Header />
          <HotelAcceptSection
            printFn={() => window.print()}
            hotelName={`${settings.title} - هتل ${data.hotel.name}`}
            data={{
              codePeigiri: data.tracking_code,
              createdAt: data.created_at,
              enterAt: data.check_in_date,
              exitAt: data.check_out_date,
              phoneNumber: data.reserver_phone,
              reserver: data.reserver_name,
            }}
          />
          <div className="p-3 lg:h-16 bg-[#f8f8f8] border border-black/10 rounded-lg lg:flex hidden items-center justify-between gap-5">
            <p className="font-semibold text-[#2c2c2c] text-cs75 block text-right truncate">{`هتل ${data.hotel.name} - ${data.hotel.address}`}</p>
          </div>
          <div className="lg:hidden block py-[20px] border-y-[1.5px] border-black/10">
            <div className="flex items-start justify-start gap-[10px]">
              <div className="h-[43px] w-[43px] rounded-[5px] bg-gray-100 flex items-center justify-center shrink-0">
                <IconsaxIcons name="Location" className="h-[17px] w-[17px]" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-black truncate block text-right mb-1">
                  آدرس هتل
                </span>
                <p className="text-[10px] font-medium text-gray-600 text-right">
                  {data.hotel.address}
                </p>
              </div>
            </div>
          </div>
          <RoomsSection
            data={data.rooms.map((item) => ({
              info: {
                enteranceHalfCharge: item.half_day_in,
                exitHalfCharge: item.half_day_out,
                hotelName: item.room_name,
                meals: item.services,
                reserver: data.reserver_name,
                timeSpan: item.nights,
              },
              passenger: data.passengers
                .filter((passenger) => passenger.name !== data.reserver_name)
                .map((passenger) => passenger.name),
            }))}
          />
          <RulesSection
            contactNumber={settings.contact_number_1}
            signatureImage={settings.signature_image}
            hotelName={data.hotel.name}
            rules={data.hotel_rules}
          />
        </main>
      </>
    );
  }
}
