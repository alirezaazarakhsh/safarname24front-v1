'use client';

import { useMediaQuery } from '@/hooks';
import { contactUs } from '@/constants/landing';

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerContent,
  DrawerDescription,
} from '@/components/ui/drawer';

type Props = {
  isOpen: boolean;
  onClick?: () => void;
  reactionType: 'success' | 'fail';
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// ---------------------------------------

export default function SendTicketReaction(props: Props) {
  const { isOpen, setOpen, onClick, reactionType } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const content =
    reactionType === 'success'
      ? contactUs.sendTicketReaction.success
      : contactUs.sendTicketReaction.fail;

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="max-w-[400px] text-cs08 font-semibold gap-0">
              <DialogTitle className="text-zinc-800 text-base font-extrabold">
                {content.title}
              </DialogTitle>

              <DialogDescription className="text-zinc-500 mt-3 mb-6 flex flex-col">
                <span>مشتری گرامی</span>
                <span>
                  از ثبت نظر محبت آمیز شما متشکریم , دیدگاه شما پس از تایید
                  ادمین نمایش داده خواهد شد.
                </span>
              </DialogDescription>

              <DialogClose
                onClick={onClick}
                className={`w-max h-10 text-zinc-100 px-6 rounded-lg ${
                  reactionType === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              >
                {reactionType === 'success' ? 'متوجه شدم' : 'تلاش مجدد'}
              </DialogClose>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          {/* Drawer (Small-Device) */}
          <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent className="text-cs08 font-semibold">
              <DrawerTitle className="text-zinc-800 text-cs09 font-extrabold">
                {content.title}
              </DrawerTitle>

              <DrawerDescription className="text-zinc-500 mt-3 mb-5 flex flex-col">
                <span>مشتری گرامی</span>
                <span>
                  متاسفانه در ثبت دیدگاه شما مشکلی رخ داده است , لطفا دقایقی
                  دیگر مجدد تلاش فرمایید.
                </span>
              </DrawerDescription>

              <DrawerClose
                onClick={onClick}
                className={`w-max h-10 text-zinc-100 px-6 rounded-lg ${
                  reactionType === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              >
                {reactionType === 'success' ? 'متوجه شدم' : 'تلاش مجدد'}
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
