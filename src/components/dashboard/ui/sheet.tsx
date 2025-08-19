// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SheetComponentPropsType } from '@/types/dashboard/component';
import { createPortal } from 'react-dom';
import Logo from './logo';
import { ICX } from '@/components/icons/ICX';
import { usePathname } from 'next/navigation';

// Creating and exporting Sheet component as default
export default function Sheet({
  children,
  closeFn,
  isOpened,
  className,
}: SheetComponentPropsType): ReactNode {
  // Defining hooks
  const pathname = usePathname();

  // Using useEffect to remove availibilty to scroll when datePicker opens
  useEffect(() => {
    const bodyElement = document.body;

    isOpened
      ? (bodyElement.style.overflow = 'hidden')
      : (bodyElement.style.overflow = 'auto');
  }, [isOpened]);

  // Using useEffect to close sheet when page changes
  useEffect(() => closeFn && closeFn(), [pathname]);

  // Returning JSX
  return createPortal(
    <div className={className}>
      <motion.div
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        initial={{ opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}
        animate={
          isOpened
            ? { opacity: 1, visibility: 'visible', pointerEvents: 'auto' }
            : { opacity: 0, visibility: 'hidden', pointerEvents: 'none' }
        }
        className="w-dvw h-dvh bg-black/20 fixed top-0 left-0 z-40"
        onClick={closeFn}
      />
      <motion.div
        className="bg-white lg:w-[27vw] w-dvw h-dvh overflow-auto custom-scrollbar fixed top-0 z-50 gap-3 p-5"
        transition={{ duration: 0.5 }}
        exit={{
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          right: '-30vw',
        }}
        initial={{
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          right: '-30vw',
        }}
        animate={
          isOpened
            ? {
                opacity: 1,
                visibility: 'visible',
                pointerEvents: 'auto',
                right: '0',
              }
            : {
                opacity: 0,
                visibility: 'hidden',
                pointerEvents: 'none',
                right: '-30vw',
              }
        }
      >
        <div className="flex lg:items-start items-center justify-between gap-3 lg:mb-10 mb-[12px]">
          <Logo />
          <button onClick={closeFn}>
            <ICX className="lg:w-3 lg:h-3 w-[16px] h-[16px] text-gray-400" />
          </button>
        </div>
        <div>{children}</div>
      </motion.div>
    </div>,
    document.body,
  );
}
