'use client';

import { Invoice } from '../helpers/type';
import { useEffect, useMemo } from 'react';
import { payment } from '../helpers/constant';

import { axiosInstance } from '@/utils/axios';
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
  const { discountCode, extraPassengers, halfCharges } =
    usePaymentInvoiceContext();

  // === Final-Total-Price
  const finalTotalPrice = useMemo(() => {
    if (!invoice) return 0;

    return (
      (invoice.total_price ?? 0) +
      extraPassengers +
      halfCharges -
      (discountCode + (invoice.discount_on_purchase ?? 0))
    );
  }, [invoice, extraPassengers, halfCharges, discountCode]);

  // === Update PaymentInvoice-Context
  useEffect(() => {
    if (!invoice) return;

    dispatch({
      actionType: null,
      type: 'first-render',
      payload: {
        halfCharges: invoice?.half_charges,
        discountCode: invoice?.discount_code,
        extraPassengers: invoice?.extra_passengers,
      },
    });
  }, [invoice]);

  return (
    <div className="bg-white p-5 pt-4 grid gap-4 border rounded-xl">
      <span className="text-cs85 font-bold pb-3.5 mb-1 border-b">
        صورتحساب پرداختی
      </span>

      {status === 'pending' ? (
        <Loading />
      ) : (
        <>
          {invoice?.total_price && (
            <InvoiceItem name="قیمت کل" value={invoice?.total_price} />
          )}

          {extraPassengers > 0 && (
            <InvoiceItem name="نفرات اضافه" value={extraPassengers} />
          )}

          {halfCharges > 0 && (
            <InvoiceItem name="نیم شارژ" value={halfCharges} />
          )}

          {discountCode > 0 && (
            <InvoiceItem type="discount" name="کد تخفیف" value={discountCode} />
          )}

          {invoice?.discount_on_purchase &&
          invoice?.discount_on_purchase > 0 ? (
            <InvoiceItem
              type="discount"
              name="تخفیف هنگام خرید"
              value={invoice?.discount_on_purchase}
            />
          ) : null}

          <InvoiceItem
            name="مبلغ نهایی"
            value={finalTotalPrice}
            specialType="final-total-price"
          />
        </>
      )}
    </div>
  );
}
