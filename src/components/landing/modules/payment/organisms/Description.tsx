'use client';

import { useEffect, useState } from 'react';

// ------------------------------

export function Description() {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionValue = sessionStorage.getItem('payment-description');
      if (sessionValue) setValue(sessionValue);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      sessionStorage.setItem('payment-description', value);
    }
  }, [value]);

  return (
    <div className="bg-white p-5 pt-4 grid gap-3 overflow-hidden border rounded-xl">
      <div className="flex items-center gap-2">
        <span className="text-cs85 font-bold">توضیحات :</span>
        <span className="bg-zinc-100 text-zinc-500 text-cs07 font-semibold px-2 py-0.5 pt-1 rounded-md">
          * اختیاری
        </span>
      </div>

      <textarea
        value={value}
        name="description"
        onChange={(e) => setValue(e.target.value)}
        placeholder="توضیحات تکمیلی خود را وارد نمایید ..."
        className="min-h-20 max-h-40 text-zinc-500 text-cs08/5 font-semibold custom-scrollbar resize-y outline-none"
      />
    </div>
  );
}
