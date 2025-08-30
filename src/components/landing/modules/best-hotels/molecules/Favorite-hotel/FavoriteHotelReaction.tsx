'use client';

import { useMediaQuery } from '@/hooks';
import { bestHotels } from '@/constants/landing';

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
  reactionType: 'saved' | 'unsaved' | 'fail';
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// ---------------------------------------

export default function FavoriteHotelReaction(props: Props) {
  const { isOpen, setOpen, reactionType } = props;
  const {
    favoriteHotelReaction: { saved, unsaved, fail },
  } = bestHotels;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const content =
    reactionType === 'saved'
      ? saved
      : reactionType === 'unsaved'
        ? unsaved
        : fail;

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="max-w-[400px] text-cs85 font-semibold p-7 pb-6 gap-0">
              <DialogTitle className="text-zinc-800 text-[0.95rem]/6! font-extrabold">
                {content.title}
              </DialogTitle>

              <DialogDescription className="text-zinc-500 mt-3 mb-6 flex flex-col">
                <span>مشتری گرامی</span>
                <span>{content.desc}</span>
              </DialogDescription>

              <DialogClose
                className={`w-max h-10 text-zinc-100 text-cs08 px-6 rounded-lg ${
                  reactionType === 'fail' ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              >
                {reactionType === 'fail' ? 'تلاش مجدد' : 'متوجه شدم'}
              </DialogClose>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          {/* Drawer (Small-Device) */}
          <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent className="text-cs85/6 font-semibold">
              <DrawerTitle className="text-zinc-800 text-cs95 font-extrabold">
                {content.title}
              </DrawerTitle>

              <DrawerDescription className="text-zinc-500 mt-3 mb-5 flex flex-col">
                <span>مشتری گرامی</span>
                <span>{content.desc}</span>
              </DrawerDescription>

              <DrawerClose
                className={`w-max h-10 text-zinc-100 text-cs08 px-6 rounded-lg ${
                  reactionType === 'fail' ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              >
                {reactionType === 'fail' ? 'تلاش مجدد' : 'متوجه شدم'}
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
