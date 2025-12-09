// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SubscriptionDetailsDialogPropsType } from '@/types/dashboard/component';
import { getPercentage } from '@/utils/utils';
import { addCommas } from '@persian-tools/persian-tools';
import { JSX } from 'react';

// Defining dummy data to render
const data: {
  name: string;
  levelName?: string;
  unlocksAfter: number;
}[] = [{
  levelName: "سطح 3",
  name: "معمولی",
  unlocksAfter: 30000000
}, {
  name: "معمولی",
  unlocksAfter: 1250000
}];

// Creating and exporting SubscriptionDetailsDialog component as default
export default function SubscriptionDetailsDialog({
  open, onOpenChange,
}: SubscriptionDetailsDialogPropsType): JSX.Element {
  // Defining variables
  const dummyCurrentScore = 1340000;

  // Returning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:max-w-[550px] max-w-full gap-0 p-0 lg:rounded-xl rounded-none">
        <div className='lg:p-5 p-4 space-y-5  lg:max-h-[calc(100dvh-50px-25px)] max-h-dvh overflow-auto scrollbar-hide'>
          <div>
            <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black truncate block mb-1">
              کارت اشتراک خرید
            </DialogTitle>
            <DialogDescription className='text-right text-sm font-light text-black/70 leading-6 block'>
              مشتری گرامی عزیز برای دریافت کد تخفیف کارت اشتراکی باید به سطح خرید های که پایین قرار داده شده رعایت بفرمایید و لذا سیستم با توجه به خرید های مدام شما از سفرنامه 24 روند خرید شما اتومات حساب میشود و بعد از هر استفاده سطح بعدی شروع میشه.
            </DialogDescription>
          </div>
          <div className='space-y-6'>
            {
              data.map((item, index) => (
                <div key={index}>
                  <div className='flex items-center justify-between gap-3 mb-4'>
                    <div className='overflow-hidden flex-1'>
                      <span className="text-right mb-1 lg:text-[14px] text-[12px] block font-bold text-black truncate">{`کارت اشتراک ${item.name}`}</span>
                      <span className="text-right lg:text-[14px] text-[12px] block font-normal text-black/70 truncate">{`خرید بالای به مبلغ ${addCommas(item.unlocksAfter)} تومان`}</span>
                    </div>
                    {
                      item.levelName && (
                        <div className='flex items-center justify-center px-4 py-2 rounded-md text-cs07 font-medium text-black border border-black/10 shrink-0'>
                          {item.levelName}
                        </div>
                      )
                    }
                  </div>
                  <div>
                    <div className='flex items-center justify-between gap-3 mb-2'>
                      <span className="text-right text-[12px] font-normal block text-black/70 truncate">{`روند خرید شما : ${addCommas(dummyCurrentScore)} تومان`}</span>
                      <span className="text-left text-[12px] font-normal block text-black/70 truncate">{`${getPercentage(item.unlocksAfter, dummyCurrentScore)}%`}</span>
                    </div>
                    <div className='h-[5px] w-full overflow-hidden bg-black/10 rounded-3xl'>
                      <div className='h-[5px] rounded-3xl bg-cs-red' style={{
                        width: `${getPercentage(item.unlocksAfter, dummyCurrentScore)}%`
                      }} />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <DialogFooter dir="ltr">
            <DialogClose asChild>
              <button
                className='flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-black bg-black/5 transition-all duration-500 hover:bg-black/10'
              >
                متوجه شدم
              </button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
