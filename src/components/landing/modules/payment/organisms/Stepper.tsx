'use client';

import {
  StepOne,
  StepTwo,
  StepFour,
  StepThree,
  StepBackButton,
} from '../molecules/stepper';

import { useEffect, useMemo } from 'react';
import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ApiResponse = { payment_status: 'unpaid' | 'paid' | 'pending' };

// ------------------------------

export function Stepper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { stepper, reservationId } = payment;
  const trackingCode = searchParams.get(reservationId);

  // === Fetch Payment-Status
  const { data: paymentStatus, status } = useQuery<ApiResponse>({
    queryKey: ['payment-status'],
    queryFn: () => axiosInstance(`/payment/payment-status/${trackingCode}/`),
  });

  // Check payment-status
  // useEffect(() => {
  //   if (
  //     (pathname.includes('complete-passengers-information') ||
  //       pathname.includes('check-reservation-information')) &&
  //     status !== 'pending' &&
  //     paymentStatus?.payment_status !== 'pending'
  //   ) {
  //     router.replace('/');
  //   }
  // }, [paymentStatus, status, pathname]);

  // === Calculate Active-Step
  const activeStep = useMemo(() => {
    const checkInclude = (value: string) => pathname.includes(value);
    let activeStep = 0;

    if (checkInclude('complete-passengers-information')) activeStep = 1;
    else if (checkInclude('check-reservation-information')) activeStep = 2;
    else if (checkInclude('watcher-info')) activeStep = 4;
    else activeStep = 0;

    return activeStep;
  }, [pathname]);

  return (
    <div className="lg:col-span-2">
      <div className="flex-between items-center lg:rounded-xl lg:border lg:bg-white lg:p-5">
        <div className="flex flex-1 gap-1.5 lg:flex-none lg:gap-14">
          <StepOne activeStep={activeStep} trackingCode={trackingCode} />
          <StepTwo activeStep={activeStep} trackingCode={trackingCode} />
          <StepThree activeStep={activeStep} trackingCode={trackingCode} />
          <StepFour activeStep={activeStep} trackingCode={trackingCode} />
        </div>

        <div className="hidden lg:block">
          <StepBackButton activeStep={activeStep} />
        </div>
      </div>

      <div className="flex-between mt-6 items-center rounded-xl border bg-white p-4 lg:hidden">
        <div className="grid gap-1.5 text-cs08/5 font-bold">
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
