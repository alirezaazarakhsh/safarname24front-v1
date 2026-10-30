'use client';

import {
  RoomInfo,
  Reserver,
  HalfCharges,
  MainPassenger,
  ExtraCapacityPassengers,
  OtherPassengers,
} from '../molecules/reservation-form';

import { useEffect, useCallback } from 'react';
import { FormSchema } from '../helpers/type';

import { usePaymentLoading } from '@/context';
import { useUserAccountContext } from '@/context/UserAccountContext';
import { useCheckAuth } from '@/hooks';
import { payment } from '../helpers/constant';

import { formSchema } from '../helpers/schema';
import { getFormDefaultValues } from '../utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loading, Error } from '../atoms/reservation-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { handleSubmit as onSubmit } from '../utils/handle-submission';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

// ------------------------------

export function ReservationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const { isAuthenticated } = useCheckAuth();
  const { toggle: openLoginModal } = useUserAccountContext();
  const { handleToggleLoading } = usePaymentLoading();

  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<FormSchema>({
    queryKey: ['reservation-form/1', trackingCode],
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

  // بررسی وضعیت لاگین بودن کاربر
  const checkIsUserAuth = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return Boolean(
      isAuthenticated ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      Cookies.get('auth') ||
      Cookies.get('AUTH')
    );
  }, [isAuthenticated]);

  // بازنشانی فرم با مقادیر اولیه دریافتی
  useEffect(() => {
    if (data) methods.reset(data);
  }, [data, methods]);

  function handleNavigation() {
    router.push(
      `/payment/check-reservation-information?${payment.reservationId}=${trackingCode}`,
      { scroll: false },
    );
  }

  // مدیریت ثبت فرم و هدایت به لاگین
  const handleFormSubmit = useCallback(async (formData: FormSchema) => {
    // اگر کاربر لاگین نبود، فرم ذخیره شده و پنجره لاگین باز می‌شود
    if (!checkIsUserAuth()) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pending_passenger_form', JSON.stringify(formData));
      }
      openLoginModal();
      return;
    }

    // اگر کاربر لاگین بود، ۵ آرگومان طبق ساختار اصلی فرستاده می‌شود
    await onSubmit(
      formData,
      trackingCode,
      handleNavigation,
      handleToggleLoading,
      () =>
        queryClient.invalidateQueries({
          queryKey: ['reservation-form'],
        }),
    );
  }, [checkIsUserAuth, openLoginModal, trackingCode, handleToggleLoading, queryClient]);

  // ثبت خودکار فرم بلافاصله پس از لاگین کاربر
  useEffect(() => {
    if (checkIsUserAuth() && trackingCode) {
      const savedFormData = sessionStorage.getItem('pending_passenger_form');
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData);
          sessionStorage.removeItem('pending_passenger_form');
          handleFormSubmit(parsedData);
        } catch {
          sessionStorage.removeItem('pending_passenger_form');
        }
      }
    }
  }, [isAuthenticated, checkIsUserAuth, trackingCode, handleFormSubmit]);

  return (
    <FormProvider {...methods}>
      {status === 'pending' ? (
        <Loading />
      ) : status === 'error' ? (
        <Error />
      ) : (
        <form
          id="passengers-form"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
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
                  index={roomIndex}
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