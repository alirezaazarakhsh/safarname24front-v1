'use client';

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer';

import { useMediaQuery } from '@/hooks';
import { IoClose } from 'react-icons/io5';
import SharingContent from './SharingContent';

type Props = {};

// -----------------------------------------------------

export default function Sharing(props: Props) {
  const {} = props;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <>
          {/* Dialog (Large-Device) */}
          <Dialog>
            <DialogTrigger className="bg-zinc-200/50 text-zinc-700 text-[clamp(0.75rem,2vw,0.8rem)] font-bold flex-center gap-1 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/60 sm:px-6">
              اشتراک گذاری
            </DialogTrigger>

            <DialogContent className="bg-[#f8f8f8] p-8">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>

              <DialogClose className="absolute left-8 top-9">
                <IoClose size={22} color="#666" />
              </DialogClose>

              <SharingContent />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          {/* Drawer (Small-Device) */}
          <Drawer>
            <DrawerTrigger className="bg-zinc-200/50 text-zinc-700 text-cs08 font-bold px-5 flex-center gap-1 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/60 xl:px-6">
              اشتراک گذاری
            </DrawerTrigger>

            <DrawerContent className="bg-[#f8f8f8]">
              <DrawerTitle className="hidden"></DrawerTitle>
              <DrawerDescription className="hidden"></DrawerDescription>

              <SharingContent />
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
}
