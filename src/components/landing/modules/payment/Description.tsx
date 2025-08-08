import React from 'react';

// ------------------------------

export function Description() {
  return (
    <div className="bg-white p-5 grid gap-4 overflow-hidden border rounded-xl">
      <div className="flex items-center gap-2">
        <span className="text-cs85 font-bold">توضیحات</span>
        <span className="bg-zinc-100 text-zinc-600 text-cs07 font-bold px-2 py-0.5 pt-1 rounded-md">
          * اختیاری
        </span>
      </div>

      <textarea
        name="description"
        placeholder="توضیحات تکمیلی خود را وارد نمایید ..."
        className="h-20 text-zinc-500 text-cs08 font-semibold outline-none"
      ></textarea>
    </div>
  );
}
