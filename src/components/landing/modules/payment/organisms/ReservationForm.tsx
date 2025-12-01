'use client';

import {
  RoomInfo,
  Reserver,
  HalfCharges,
  MainPassenger,
  ExtraCapacityPassengers,
} from '../molecules/reservation-form';

import { useEffect } from 'react';
import { FormSchema } from '../helpers/type';

import { usePaymentLoading } from '@/context';
import { payment } from '../helpers/constant';

import { formSchema } from '../helpers/schema';
import { getFormDefaultValues } from '../utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loading, Error } from '../atoms/reservation-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { OtherPassengers } from '../molecules/reservation-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { handleSubmit as onSubmit } from '../utils/handle-submission';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

// ------------------------------

export function ReservationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const { handleToggleLoading } = usePaymentLoading();
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<FormSchema>({
    queryKey: ['reservation-form/1'],
    queryFn: () => getFormDefaultValues(trackingCode),
  });

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { fields: roomFields } = useFieldArray({
    control: methods.control,
    name: 'rooms',
  });

  // === Reset Form After Fetch-Data
  useEffect(() => {
    if (data) methods.reset(data);
  }, [data, methods.reset]);

  function handleNavigation() {
    router.push(
      `/payment/check-reservation-information?${payment.reservationId}=${trackingCode}`,
    );
  }

  return (
    <FormProvider {...methods}>
      {status === 'pending' ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        <form
          id="passengers-form"
          onSubmit={methods.handleSubmit((formData) =>
            onSubmit(
              formData,
              trackingCode,
              handleNavigation,
              handleToggleLoading,
              () =>
                queryClient.invalidateQueries({
                  queryKey: ['reservation-invoice'],
                }),
            ),
          )}
          className="rounded-xl border bg-white p-5 pb-6"
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        >
          <Reserver />
          {roomFields.map((room, roomIndex) => {
            return (
              <fieldset
                key={room.id}
                className="mt-6 space-y-5 border-b pb-7 last:border-0 last:pb-0"
              >
                <RoomInfo
                  name={room.name}
                  capacity={room.capacity}
                  extraCapacity={room.extra_capacity}
                  discountOnPurchase={room.discount_on_purchase}
                />

                <MainPassenger roomIndex={roomIndex} />
                <OtherPassengers
                  roomIndex={roomIndex}
                  control={methods.control}
                  length={room.capacity - 1}
                />

                <ExtraCapacityPassengers
                  roomIndex={roomIndex}
                  control={methods.control}
                  length={room.extra_capacity}
                  passengerPrice={room.extra_capacity_price}
                />

                <HalfCharges
                  roomIndex={roomIndex}
                  halfCharges={room.half_charges}
                />
              </fieldset>
            );
          })}
        </form>
      )}
    </FormProvider>
  );
}
