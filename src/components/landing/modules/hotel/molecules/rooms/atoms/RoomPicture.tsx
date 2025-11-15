'use client';

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import Image from 'next/image';
import { Add } from 'iconsax-react';
import { useMediaQuery } from '@/hooks';

type Props = {
  image: string;
};

// -------------------------------

export default function RoomPicture(props: Props) {
  const { image } = props;
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger>
            <Image fill src={image} alt="room-view" className="object-cover" />
          </DialogTrigger>

          <DialogContent className="aspect-video max-w-[44rem] rounded-3xl p-4">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                fill
                src={image}
                alt="room-view"
                className="object-cover"
              />

              <DialogClose className="absolute right-4 top-4 rounded-cs-10 bg-white p-1">
                <Add color="#444" className="size-7 rotate-45" />
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Image fill src={image} alt="room-view" className="object-cover" />
      )}
    </>
  );
}
