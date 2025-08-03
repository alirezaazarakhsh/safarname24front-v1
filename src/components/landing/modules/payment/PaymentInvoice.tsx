import React from 'react';

// ------------------------------

export function PaymentInvoice() {
  return (
    <div className="bg-white p-4 border-2 rounded-xl">
      <span className="text-cs09 font-extrabold">صورتحساب پرداختی</span>

      <div className="mt-3 mb-6 border-b-2 border-dashed" />

      <div className="text-cs85 font-semibold flex-between">
        <div className="text-zinc-700 flex items-center gap-1">
          <span>قیمت کل</span>
          <span>{3}</span>
          <span>شب :</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>10,000,000</span>
          <span>تومان</span>
        </div>
      </div>

      <div className="text-cs85 font-semibold mt-4 flex-between">
        <div className="text-zinc-700 flex items-center gap-1">
          مبلغ کسر شده کد تخفیف :
        </div>

        <div className="flex items-center gap-1.5">
          <span>2,000,000</span>
          <span>تومان</span>
        </div>
      </div>

      <div className="bg-[#22AD5A] text-white h-12 text-cs85 font-semibold px-4 mt-5 flex-between items-center rounded-cs-10">
        <span>مجموع مبلغ پرداختی :</span>

        <div className="flex items-center gap-1.5">
          <span>15,000,000</span>
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
}
