'use client';

import { useMemo } from 'react';
import { FormSchema } from '../helpers/type';
import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';

import { useQuery } from '@tanstack/react-query';
import { Step, StepBackButton } from '../molecules/stepper';
import { usePathname, useSearchParams } from 'next/navigation';
import { useReservationStatus } from '../helpers/useReservationStatus';

// ------------------------------

export function Stepper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { stepper, reservationId } = payment;
  const trackingCode = searchParams.get(reservationId);

  const { status } = useReservationStatus(trackingCode);

  // === Fetch Form-Data
  const { data: reservationForm, isLoading: formLoading } =
    useQuery<FormSchema>({
      queryKey: ['reservation-form'],
      queryFn: async () => {
        return axiosInstance(`/hotel/reservation/form/${trackingCode}/`).then(
          (data) => data.data,
        );
      },
    });

  // === Calculate Active-Step
  const activeStep = useMemo(() => {
    function checkInclude(value: string) {
      return pathname.includes(value);
    }

    return checkInclude('complete-passengers-information')
      ? 1
      : checkInclude('check-reservation-information')
        ? 2
        : 4;
  }, [pathname]);

  // === Calculate Confirmation
  function calculateConfirmedIndex(index: number) {
    let isConfirmed: 'confirmed' | 'rejected' | 'pending' = 'pending';

    if (index + 1 === 1) {
      isConfirmed = reservationForm?.rooms[0].passengers.main_passenger
        .first_name
        ? 'confirmed'
        : 'pending';
    } else if (index + 1 === 2) {
      isConfirmed =
        status === 'confirmed'
          ? 'confirmed'
          : status === 'rejected'
            ? 'rejected'
            : 'pending';
    }

    return isConfirmed;
  }

  // === Calculate Loading
  function calculateLoadingState(index: number) {
    let isLoading = true;

    if (index + 1 === 1) {
      isLoading = formLoading;
    } else if (index + 1 === 2) {
      isLoading = activeStep === 2 ? status === 'initial' : false;
    } else {
      isLoading = false;
    }

    return isLoading;
  }

  return (
    <div className="lg:col-span-2">
      <div className="flex-between items-center lg:bg-white lg:p-5 lg:border lg:rounded-xl">
        <div className="flex-1 flex gap-1.5 lg:flex-none lg:gap-14">
          {stepper.map((step, index) => (
            <Step
              key={index}
              step={index}
              icon={step.icon}
              title={step.title}
              isActive={activeStep === index + 1}
              isLoading={calculateLoadingState(index)}
              isConfirmed={calculateConfirmedIndex(index)}
            />
          ))}
        </div>

        <div className="hidden lg:block">
          <StepBackButton activeStep={activeStep} />
        </div>
      </div>

      <div className="bg-white p-4 mt-6 flex-between items-center border rounded-xl lg:hidden">
        <div className="text-cs08/5 font-bold grid gap-1.5">
          <span className="text-zinc-500">
            مرحله {stepper[activeStep - 1].step}
          </span>

          <span>{stepper[activeStep - 1].title}</span>
        </div>

        <StepBackButton activeStep={activeStep} />
      </div>
    </div>
  );
}
