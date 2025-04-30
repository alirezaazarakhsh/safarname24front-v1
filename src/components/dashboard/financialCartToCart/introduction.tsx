// Importing part
import { ReactNode } from 'react';

// Creating and exporting Introduction component as default
export default function Introduction(): ReactNode {
  // Returning JSX
  return (
    <div className="bg-white rounded-lg border border-black/10 p-3 flex items-center justify-start overflow-hidden col-span-2">
      <div className="overflow-hidden">
        <h1 className="text-cs85 font-semibold text-black truncate block mb-2">
          بخش مالی - کارت به کارت
        </h1>
        <p className="text-cs75 font-normal text-black truncate block text-right w-full">
          مشتری گرامی در این بخش میتوایند مبلغ مدنظرتون واریز و برداشت کنید.
        </p>
      </div>
    </div>
  );
}
