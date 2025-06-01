'use client';

import { useState } from 'react';

import { useMediaQuery } from '@/hooks';
import { useAddCommentContext } from '@/context/AddCommentContext';

import AddCommentChildren from './AddCommentChildren';
import useControlBodyOverflow from '@/hooks/useControlBodyOverflow';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type CommentType = 'rating' | 'desc';

// --------------------------------------

export default function AddCommentWrapper(props: Props) {
  const { isOpen, setOpen } = props;

  const {} = useAddCommentContext();

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [commentType, setCommentType] = useState<CommentType>('rating');

  // Control Body-Overflow
  useControlBodyOverflow(!isDesktop && isOpen);

  return (
    <>
      {!isDesktop ? (
        // ==== Small-Screen
        <div
          className={`fixed z-40 inset-0 bg-[#f8f8f8] w-full h-dvh px-6 grid grid-rows-[9rem_1fr_6.5rem] transition-all duration-500 ease-in-out ${isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'}`}
        >
          <AddCommentChildren
            commentType={commentType}
            setCommentType={setCommentType}
            closeDialog={() => setOpen(false)}
          />
        </div>
      ) : (
        // ==== Large-Screen
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogContent className="bg-[#f8f8f8] h-[33rem] p-7 flex flex-col gap-6">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <AddCommentChildren
              commentType={commentType}
              setCommentType={setCommentType}
              closeDialog={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
