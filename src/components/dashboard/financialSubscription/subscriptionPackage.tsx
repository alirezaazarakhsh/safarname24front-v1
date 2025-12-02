// Forcing next.js to render this component as client side component
'use client';

// Importing part 
import { SubscriptionPackagePropsType } from "@/types/dashboard/component";
import { cn } from "@/utils/utils";
import { addCommas } from "@persian-tools/persian-tools";
import { JSX, useState } from "react";
import BuySubscriptionDialog from "./dialog/buySubscriptionDialog";

// Creating and exporting SubscriptionPackage component as default
export default function SubscriptionPackage({
  data: {
    features,
    id,
    name,
    price,
    subTitle
  }, className
}: SubscriptionPackagePropsType): JSX.Element {
  // Defininig hooks
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  // Returning JSX
  return (
    <>
      <BuySubscriptionDialog
        id={id}
        open={modalOpened}
        onOpenChange={setModalOpened}
      />
      <div
        onClick={(() => setModalOpened(true))}
        className={cn(
          "cursor-pointer text-black bg-white border border-black/10 lg:rounded-xl rounded-[18px] lg:p-6 p-[18px] group transition-all duration-500 hover:border-black flex flex-col items-center justify-between",
          className
        )}
      >
        <div className="w-full mb-10 shrink-0">
          <span className="text-xl font-bold mb-2 truncate text-right block text-current">{name}</span>
          <span className="text-sm font-light mb-3 truncate text-right block text-current/75">{subTitle}</span>
          <div className="flex items-end justify-start gap-2">
            <span className="text-2xl font-black truncate text-right block text-current">{addCommas(price)} تومان</span>
            <span className="text-sm font-light shrink-0 text-right block text-current/75">/ ماهانه</span>
          </div>
        </div>
        <ul className="space-y-4 list-inside list-disc mb-5 lg:h-full h-auto w-full overflow-auto custom-scrollbar">
          {
            features.map((item, index) => (
              <li key={index} className="text-sm font-light truncate text-right text-current list-disc">
                {item}
              </li>
            ))
          }
        </ul>
        <div className="h-[45px] flex items-center transition-all duration-500 justify-center rounded-lg p-4 border bg-white border-black/10 text-black group-hover:border-black group-hover:bg-black group-hover:text-white shrink-0 w-full">
          <span className="font-medium text-current text-sm truncate block text-center">برای شروع کلیک کنید</span>
        </div>
      </div>

    </>
  );
} 
