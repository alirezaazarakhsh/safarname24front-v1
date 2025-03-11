import { useMediaQuery } from '@/hooks';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// ---------------------------------------

export default function AuthGuardReaction(props: Props) {
  const { isOpen, setOpen } = props;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="max-w-[500px] text-cs08/5 font-semibold gap-0">
              <DialogTitle className="text-zinc-800 text-cs95 font-extrabold">
                ورود به حساب کاربری
              </DialogTitle>

              <DialogDescription className="text-zinc-500 mt-4 mb-6 flex flex-col">
                <span>مشترک گرامی عزیز</span>
                <span>
                  ابتدا وارد حساب خود شوید و سپس اقدام به مشاهده این بخش نمایید
                  .
                </span>
                <span>از همراهی شما سپاسگذاریم .</span>
              </DialogDescription>

              <div className="w-[70%] h-10 text-cs75 grid grid-cols-[1fr_1.5fr] gap-4">
                <DialogClose className="bg-cs-red/90 text-zinc-100 rounded-lg transition-colors duration-200 ease-in-out hover:bg-cs-red/95">
                  منصرف شدم
                </DialogClose>

                <DialogClose className="text-zinc-500 border-2 border-zinc-300 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-100/50">
                  ورود به حساب کاربری
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          {/* Drawer (Small-Device) */}
          <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent className="text-cs08/5 font-semibold">
              <DrawerTitle className="text-zinc-800 text-cs09 font-extrabold">
                ورود به حساب کاربری
              </DrawerTitle>

              <DrawerDescription className="text-zinc-500 mt-4 mb-6 flex flex-col">
                <span>مشترک گرامی عزیز</span>
                <span>
                  ابتدا وارد حساب خود شوید و سپس اقدام به مشاهده این بخش نمایید
                  , از همراهی شما سپاسگذاریم .
                </span>
              </DrawerDescription>

              <div className="h-10 text-cs75 grid grid-cols-[1fr_1.5fr] gap-4">
                <DrawerClose className="bg-cs-red/90 text-zinc-100 rounded-lg">
                  منصرف شدم
                </DrawerClose>

                <DrawerClose className="text-zinc-500 border-2 border-zinc-300 rounded-lg">
                  ورود به حساب کاربری
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
