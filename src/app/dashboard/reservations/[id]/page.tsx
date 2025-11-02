// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, use } from 'react';
import HotelAcceptSection from '@/components/dashboard/reservationFactor/hotelAcceptSection';
import RoomsSection from '@/components/dashboard/reservationFactor/roomsSection';
import RulesSection from '@/components/dashboard/reservationFactor/rulesSection';
import Header from '@/components/dashboard/reservationFactor/header';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import Logo from '@/components/dashboard/ui/logo';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETReservationFactor } from '@/types/dashboard/api/get';
import Loading from '@/components/dashboard/ui/loading';
import ErrorTable from '@/components/dashboard/api/errorTable';

// Creating and exporting single Reservation edit page as default
export default function SingleReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): ReactNode {
  // Defining hooks
  const { id } = use(params);
  const factorData = useApiQuery<GETReservationFactor>({
    url: `/hotel/reservation/invoices/${id}/`,
    queryKey: [`reservation-factor-${id}`],
  });

  // Conditional rendering
  if (factorData.isLoading || factorData.isRefetching) {
    return (
      <main className="p-5 h-dvh w-dvw flex items-center justify-center">
        <Loading />
      </main>
    );
  } else if (factorData.isError) {
    return <ErrorTable refetch={factorData.refetch} />;
  } else if (!factorData.isLoading && !factorData.isError && factorData.data) {
    const data = factorData.data.reservation;
    return (
      <main className="lg:p-5 lg:pb-5 lg:pt-5 pt-[calc(28px+24px)] p-[24px] pb-[100px] flex flex-col lg:gap-8 gap-[25px] bg-white print:p-0 print:m-0 print:w-full">
        <Header />
        <Logo className="hidden print:flex" />
        <HotelAcceptSection
          printFn={() => window.print()}
          hotelName={data.hotel.name}
          data={{
            codePeigiri: data.tracking_code,
            createdAt: new Date().toISOString(), // TODO: Later fetch with real time data
            enterAt: new Date().toISOString(), // TODO: Later fetch with real time data
            exitAt: new Date().toISOString(), // TODO: Later fetch with real time data
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
        <RulesSection hotelName={data.hotel.name} rules={data.hotel_rules} />
      </main>
    );
  }
}
