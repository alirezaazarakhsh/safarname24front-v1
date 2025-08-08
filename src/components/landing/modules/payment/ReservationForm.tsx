'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { HalfCharge, Input } from './molecules/reservation-form';
import { formDetail, FormSchema, reservation } from '@/helpers/payment';
import { useEffect } from 'react';
import { Plus } from 'lucide-react';

// ------------------------------

export function ReservationForm() {
  const methods = useForm<FormSchema>({
    defaultValues: {
      reserver: reservation.reserver,
      rooms: reservation.rooms,
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log('data', data);
  };

  useEffect(() => {
    console.log('form-detail', formDetail);
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white p-5 pt-4 space-y-8 border rounded-xl"
      >
        {/* === Reserver-Person */}
        <div className="space-y-4">
          <span className="text-cs85 font-bold">اطلاعات رزرو کننده</span>
          <div className="grid gap-4 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4">
            {formDetail.reserver.map((item, index) => (
              <Input
                key={index}
                name={item.name}
                placeholder={item.placeholder}
              />
            ))}
          </div>
        </div>

        {/* === Passengers */}
        <div className="space-y-8">
          {reservation.rooms.map((room, index) => (
            <div
              key={index}
              className="space-y-4 pt-6 border-t first:pt-0 first:border-none"
            >
              <div className="flex-between items-center gap-4">
                <div className="text-zinc-600 text-cs08 font-semibold flex gap-1">
                  <span className="text-zinc-900 text-cs85 font-bold ml-1">
                    مسافران اتاق {room.name}
                  </span>
                  <span>ظرفیت : {room.capacity} نفر</span>
                  <span>-</span>
                  <span>نفر اضافه : {room.extra_capacity} نفر</span>
                </div>

                <div className="h-10 flex gap-3">
                  <button className="px-3 flex-center gap-1 border transition-colors ease-in-out rounded-lg hover:bg-zinc-100/20">
                    <Plus size={14} color="#555" />
                    <span className="text-zinc-500 text-cs75 font-semibold">
                      اضافه کردن نفر
                    </span>
                  </button>
                </div>
              </div>

              {/* <div className="grid gap-4 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4">
                {formDetail.rooms[index]?.main_passenger.map((item, index) => (
                  <Input
                    key={index}
                    name={item.name}
                    placeholder={item.placeholder}
                  />
                ))}

                {formDetail.rooms[index].other_passengers.map((item) =>
                  item.map((item, index) => (
                    <Input
                      key={index}
                      name={item.name}
                      placeholder={item.placeholder}
                    />
                  )),
                )}

                {formDetail.rooms[index].extra_capacity_passengers.map(
                  (item) => (
                    <div className="bg-red-100 p-1">
                      {item.map((item, index) => (
                        <Input
                          key={index}
                          name={item.name}
                          placeholder={item.placeholder}
                        />
                      ))}
                    </div>
                  ),
                )}
              </div> */}
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>

        {/* === Half-Charges */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <HalfCharge type="enter" price={2750000} />
          <HalfCharge type="exit" price={1520000} />
        </div>
      </form>
    </FormProvider>
  );
}
