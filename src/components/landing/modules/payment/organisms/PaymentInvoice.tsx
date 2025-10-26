'use client';

import { useEffect } from 'react';
import { Invoice } from '../helpers/type';

import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';

import SimpleError from '../atoms/SimpleError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { InvoiceItem, Loading } from '../molecules/payment-invoice';
import { usePaymentInvoiceContext, usePaymentInvoiceDispatch } from '@/context';

type Response = { data: Invoice };

// ------------------------------

export function PaymentInvoice() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<Response>({
    queryKey: ['reservation-invoice'],
    queryFn: () => axiosInstance(`/hotel/reservation/invoice/${trackingCode}/`),
  });

  const invoice = data?.data;

  const dispatch = usePaymentInvoiceDispatch();
  const { extraPassengers, halfCharges } = usePaymentInvoiceContext();

  // === Update PaymentInvoice-Context
  useEffect(() => {
    if (!invoice) return;

    dispatch({
      actionType: null,
      type: 'refresh',
      payload: {
        halfCharges: invoice?.half_charges,
        extraPassengers: invoice?.extra_passengers,
      },
    });
  }, [invoice, dispatch]);

  return (
    <div className="bg-white p-5 pt-4 grid gap-4 border rounded-xl">
      <span className="text-cs85 font-bold pb-3.5 mb-1 border-b">
        صورتحساب پرداختی
      </span>

      {status === 'pending' ? (
        <Loading />
      ) : status === 'error' ? (
        <SimpleError desc="خطا در نمایش اطلاعات صورتحساب" />
      ) : (
        <>
          {(invoice?.total_price ?? 0) > 0 && (
            <InvoiceItem
              value={invoice?.total_price}
              name={`مبلغ کل ${invoice?.nights_count} شب`}
            />
          )}

          {extraPassengers > 0 && (
            <InvoiceItem name="نفرات اضافه" value={extraPassengers} />
          )}

          {halfCharges > 0 && (
            <InvoiceItem name="نیم شارژ" value={halfCharges} />
          )}

          {(invoice?.discount_code ?? 0) > 0 && (
            <InvoiceItem
              type="discount"
              name="کد تخفیف"
              value={invoice?.discount_code}
            />
          )}

          {(invoice?.discount_on_purchase ?? 0) > 0 && (
            <InvoiceItem
              type="discount"
              name="تخفیف هنگام خرید"
              value={invoice?.discount_on_purchase}
            />
          )}

          {(invoice?.wallet_withdraw ?? 0) > 0 && (
            <InvoiceItem
              type="discount"
              name="کسر شده از کیف پول"
              value={invoice?.wallet_withdraw}
            />
          )}

          <InvoiceItem
            name="مبلغ نهایی"
            value={invoice?.final_price}
            specialType="final-total-price"
          />
        </>
      )}
    </div>
  );
}
