'use client';

import { IoClose } from 'react-icons/io5';
import { ArrowRight } from 'iconsax-react';

type DialogStep = 'phone-number' | 'otp-verification';

type Props = {
  dialogStep: DialogStep;
  returnBack: () => void;
  closeDialog: () => void;
};

// --------------------------------------------

export default function DialogCloseButton(props: Props) {
  const { dialogStep, returnBack, closeDialog } = props;

  return (
    <>
      {/* Small-Device */}
      <button
        className="absolute top-10 right-6 w-10 h-10 flex-center rounded-lg transition-colors duration-300 ease-in-out md:hidden hover:bg-zinc-200/50"
        onClick={() =>
          dialogStep === 'phone-number' ? closeDialog() : returnBack()
        }
      >
        <ArrowRight size={22} color="#52525b" />
      </button>

      {/* Large-Device */}
      <button
        className="absolute top-8 left-8 w-8 h-8 bg-zinc-100/80 hidden group rounded-lg transition-colors duration-300 ease-in-out md:flex-center hover:bg-zinc-200/50"
        onClick={closeDialog}
      >
        <IoClose size={20} className="text-zinc-400" />
      </button>
    </>
  );
}
