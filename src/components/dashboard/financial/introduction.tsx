// Importing part
import { ReactNode } from 'react';

// Creating and exporting Introduction component as default
export default function Introduction(): ReactNode {
  // Returning JSX
  return (
    <div className="bg-white rounded-[10px] border border-black/10 p-3 col-span-3 lg:flex hidden items-center justify-start">
      <div>
        <h1 className="text-cs85 font-semibold text-black truncate block mb-2">
          بخش مالی - شارژ کیف پول
        </h1>
        <p className="text-[13px] font-medium text-black truncate block">
          مشتری گرامی لطفا از بین دو روش انتخابی شارژ کیف پول خود یکی را انتخاب
          نمایید.
        </p>
      </div>
    </div>
  );
}
