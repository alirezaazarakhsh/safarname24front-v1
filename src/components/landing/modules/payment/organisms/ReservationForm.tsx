'use client';

import {
  RoomInfo,
  Reserver,
  HalfCharges,
  MainPassenger,
  ExtraCapacityPassengers,
} from '../molecules/reservation-form';

import { useState } from 'react';
import { FormSchema } from '../helpers/type';

import { formSchema } from '../helpers/schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { getFormDefaultValues } from '../utils';
import { Loading, Error } from '../atoms/reservation-form';

import { OtherPassengers } from '../molecules/reservation-form';
import { handleSubmit as onSubmit } from '../utils/handle-submission';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

// ------------------------------

export function ReservationForm() {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      try {
        setLoading(true);
        setError(false);

        return await getFormDefaultValues();
      } catch (error) {
        console.error(error);
        setError(true);

        return {} as FormSchema;
      } finally {
        setLoading(false);
      }
    },
  });

  const { fields: roomFields } = useFieldArray({
    control: methods.control,
    name: 'rooms',
  });

  return (
    <FormProvider {...methods}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <form
          id="passengers-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="bg-white p-5 pb-6 border rounded-xl"
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        >
          <Reserver />

          {roomFields.map((room, roomIndex) => {
            return (
              <fieldset
                key={room.id}
                className="mt-6 pb-7 space-y-5 border-b last:border-0 last:pb-0"
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
                  length={room.passengers.other_passengers.length}
                />

                <ExtraCapacityPassengers
                  roomIndex={roomIndex}
                  control={methods.control}
                  length={room.extra_capacity}
                  passengerPrice={room.extra_capacity_price}
                />

                <HalfCharges halfCharges={room.half_charges} />
              </fieldset>
            );
          })}
        </form>
      )}
    </FormProvider>
  );
}
