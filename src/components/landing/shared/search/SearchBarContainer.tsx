'use client';

import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  setDialogClose: (value: boolean) => void;
};

// -----------------------------------------------

export default function SearchBarContainer(props: Props) {
  const { isOpen, setDialogClose } = props;

  // Control Body-Overflow
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Dialog-Container */}
      <div
        className={`fixed inset-y-0 z-40 w-full h-dvh bg-white transition-all duration-500 ease-in-out ${isOpen ? 'visible left-0' : 'invisible left-full'}`}
      >
        {/* Dialog-Content */}
        <div
          className={`h-full text-zinc-800 grid grid-rows-[4rem_1fr_5rem] transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        ></div>
      </div>
    </>
  );
}
