'use client';

import { TbChecks } from 'react-icons/tb';
import { useEffect, useRef, useState } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// ------------------------------

export function DiscountCode() {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const discountCode = 'NMJ2516JHL';

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isCopied) {
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  function copyToClipboard() {
    if (isCopied) return;
    navigator.clipboard.writeText(discountCode);
    setIsCopied(true);
  }

  return (
    <div className="bg-white font-semibold p-4 items-center border-2 rounded-lg lg:flex-between">
      <div className="mb-6 space-y-1 lg:mb-0">
        <span className="text-cs09 font-extrabold">کد تخفیف هتل</span>

        <p className="text-zinc-600 text-cs08 lg:text-cs85">
          * کد تخفیف معادل (30%) برای اتاق دوبلکس رویال (VIP) قابل استفاده
          میباشد.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <div className="bg-cs-red/10 text-cs-red h-10 font-inter font-bold px-6 flex items-center justify-center border-2 border-cs-red border-dashed rounded-lg">
          <span className="text-cs08">{discountCode}</span>
        </div>

        <button
          onClick={copyToClipboard}
          aria-label="کپی کردن کد تخفیف"
          className="relative bg-zinc-100 w-10 overflow-hidden rounded-lg transition-colors hover:bg-zinc-200/60"
        >
          <TbChecks
            size={20}
            color="#666"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-in-out ${isCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          />

          <IconsaxIcons
            size={20}
            color="#222"
            name="DocumentCopy"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-in-out ${isCopied ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
          />
        </button>
      </div>
    </div>
  );
}
