import { useMediaQuery } from '@/hooks';
import { useUserAccountContext } from '@/context/UserAccountContext';

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

  const { toggle } = useUserAccountContext();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="max-w-[400px] gap-0 text-cs85/6 font-semibold">
              <DialogTitle className="text-base font-extrabold text-zinc-800">
                ورود به حساب کاربری
              </DialogTitle>

              <DialogDescription className="mb-6 mt-2 flex flex-col text-zinc-500">
                مشتری گرامی , ابتدا وارد حساب خود شوید و سپس اقدام به مشاهده این
                بخش نمایید .
              </DialogDescription>

              <div className="flex h-10 gap-4 text-cs08">
                <DialogClose className="rounded-lg bg-cs-red/90 px-6 text-zinc-100">
                  انصراف
                </DialogClose>

                <DialogClose
                  className="rounded-lg border border-zinc-300 px-6 text-zinc-500 transition-colors hover:bg-zinc-100/20"
                  onClick={() => toggle()}
                >
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
            <DrawerContent className="text-cs85/6 font-semibold">
              <DrawerTitle className="text-cs95 font-extrabold text-zinc-800">
                ورود به حساب کاربری
              </DrawerTitle>

              <DrawerDescription className="mb-5 mt-3 flex flex-col text-zinc-500">
                مشتری گرامی , ابتدا وارد حساب خود شوید و سپس اقدام به مشاهده این
                بخش نمایید .
              </DrawerDescription>

              <div className="grid h-10 grid-cols-[1fr_1.5fr] gap-4 text-cs08">
                <DrawerClose className="rounded-lg bg-cs-red/90 text-zinc-100">
                  انصراف
                </DrawerClose>

                <DrawerClose
                  className="rounded-lg border border-zinc-300 text-zinc-500"
                  onClick={() => toggle()}
                >
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
