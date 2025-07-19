import React from 'react';

// ------------------------------

export function ApplyDiscountCode() {
  return (
    <div className="bg-white p-4 border-2 rounded-xl">
      <span className="text-cs09 font-extrabold">اعمال کد تخفیف</span>

      <div className="my-3 border-b-2 border-dashed" />

      <span className="text-zinc-500 text-cs08 font-semibold">
        مشترک گرامی کد تخفیف خود را وارد نمایید :
      </span>

      <div className="h-12 font-semibold mt-6 grid grid-cols-[max-content_1fr] gap-4">
        <button className="bg-cs-dark-blue text-white text-cs08 px-6 rounded-cs-10">
          اعمال کد تخفیف
        </button>

        <div className="flex">
          <input
            type="text"
            placeholder="- - - - - -"
            className="w-full bg-zinc-100 text-zinc-600 text-cs09 font-inter text-center px-6 rounded-cs-10"
          />
        </div>
      </div>

      <div className="bg-cs-red/10 text-cs-red h-12 text-cs85 font-semibold px-4 mt-4 flex-between items-center rounded-cs-10">
        <span>مبلغ تخفیف :</span>

        <div className="flex items-center gap-1.5">
          <span>10,000,000</span>
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
}
