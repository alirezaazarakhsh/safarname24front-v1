'use client';

import { useEffect } from 'react';
import { numberSeparation } from '@/utils';
import { usePaymentInvoiceContext } from '@/context';

// ------------------------------

export function PaymentInvoice() {
  const numberOfNights = 4;
  const totalPrice = 12_000_000;
  const discountOnPurchase = 2_000_000;

  const { discountCode, extraPassengers, halfCharges } =
    usePaymentInvoiceContext();

  const finalTotalPrice =
    totalPrice +
    extraPassengers +
    halfCharges -
    (discountCode + discountOnPurchase);

  // === Update PaymentInvoice Context
  useEffect(() => {}, []);

  return (
    <div className="bg-white text-cs08 font-semibold p-5 pt-4 grid gap-3.5 border rounded-xl">
      <span className="text-cs85 font-bold pb-3 mb-1 border-b border-dashed">
        صورتحساب پرداختی
      </span>

      {/* === Total-Price */}
      <div className="flex-between">
        <div className="text-zinc-700 flex items-center gap-1">
          <span>قیمت کل</span>
          <span>{numberOfNights}</span>
          <span>شب :</span>
        </div>

        <div className="flex items-center gap-1">
          <span>{numberSeparation(totalPrice)}</span>
          <span>تومان</span>
        </div>
      </div>

      {/* === Extra-Passengers */}
      {extraPassengers > 0 && (
        <div className="flex-between">
          <div className="text-zinc-700 flex items-center gap-1">
            نفرات اضافه :
          </div>

          <div className="flex items-center gap-1">
            <span>{numberSeparation(extraPassengers)}</span>
            <span>تومان</span>
          </div>
        </div>
      )}

      {/* === Half-Charges */}
      {halfCharges > 0 && (
        <div className="flex-between">
          <div className="text-zinc-700 flex items-center gap-1">
            نیم شارژ ها :
          </div>

          <div className="flex items-center gap-1">
            <span>{numberSeparation(halfCharges)}</span>
            <span>تومان</span>
          </div>
        </div>
      )}

      {/* === Discount-Code */}
      {discountCode > 0 && (
        <div className="text-cs-red flex-between">
          <div className="flex items-center gap-1">کد تخفیف :</div>

          <div className="flex items-center gap-1">
            <span>{numberSeparation(discountCode)}</span>
            <span>تومان</span>
          </div>
        </div>
      )}

      {/* === Discount-On-Purchase */}
      {discountOnPurchase > 0 && (
        <div className="text-cs-red flex-between">
          <div className="flex items-center gap-1">تخفیف هنگام خرید :</div>

          <div className="flex items-center gap-1">
            <span>2,000,000</span>
            <span>تومان</span>
          </div>
        </div>
      )}

      {/* === Final-Total-Price */}
      <div className="bg-[#22AD5A] text-white h-11 px-4 mt-1 flex-between items-center rounded-cs-10">
        <span>مبلغ پرداختی :</span>

        <div className="flex items-center gap-1">
          <span>{numberSeparation(finalTotalPrice)}</span>
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
}
