import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from '@/components/ui/sheet';

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import { useMediaQuery } from '@/hooks';
import { IoClose } from 'react-icons/io5';
import { ArrowRight } from 'iconsax-react';

type Props = {
  open: boolean;
  children: React.ReactNode;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

// -----------------------------

export function CollectionWrapper(props: Props) {
  const { open, onOpenChange, children } = props;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {!isDesktop ? (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent className="w-full p-0 grid grid-rows-[auto_auto_1fr_auto] gap-6">
            <SheetHeader className="h-16 px-6 flex-row items-center gap-2 space-y-0 border-b shadow-light">
              <SheetClose>
                <ArrowRight color="#222" size={20} />
              </SheetClose>

              <div className="text-zinc-800 text-cs85/6 font-semibold">
                بازگشت به صفحه
              </div>
              <SheetTitle className="hidden"></SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>

            <span className="text-zinc-800 text-cs08 font-semibold mx-6 -mb-1">
              مورد علاقه های من
            </span>

            {children}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-[400px] p-0 gap-5">
            <DialogHeader className="h-16 px-6 flex-row items-center justify-between space-y-0 border-b shadow-light">
              <div className="text-zinc-800 text-cs85 font-extrabold">
                مورد علاقه های من
              </div>

              <DialogClose>
                <IoClose color="#888" size={20} />
              </DialogClose>

              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
            </DialogHeader>

            {children}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
