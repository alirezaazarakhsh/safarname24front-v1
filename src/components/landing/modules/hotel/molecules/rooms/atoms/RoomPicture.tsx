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
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger>
            <Image fill src={image} alt="room-view" className="object-cover" />
          </DialogTrigger>

          <DialogContent className="aspect-video max-w-[42rem] p-2 rounded-3xl">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                fill
                src={image}
                alt="room-view"
                className="object-cover"
              />

              <DialogClose className="absolute top-4 right-4 p-1 rounded-cs-10 bg-white">
                <Add color="currentColor" className="size-7 rotate-45" />
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
