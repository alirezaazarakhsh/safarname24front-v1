// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SheetComponentPropsType } from '@/types/dashboard/component';
import { createPortal } from 'react-dom';
import Logo from './logo';
import { ICX } from '@/components/icons/ICX';

// Creating and exporting Sheet component as default
export default function Sheet({
  children,
  closeFn,
  isOpened,
}: SheetComponentPropsType): ReactNode {
  // Using useEffect to remove availibilty to scroll when datePicker opens
  useEffect(() => {
    const bodyElement = document.body;

    isOpened
      ? (bodyElement.style.overflow = 'hidden')
      : (bodyElement.style.overflow = 'auto');
  }, [isOpened]);

  // Returning JSX
  return createPortal(
    <>
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
        className="bg-white w-[30vw] h-dvh overflow-auto custom-scrollbar fixed top-0 z-50 gap-3 p-5"
        transition={{ duration: 0.5 }}
        exit={{
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          right: '30vw',
        }}
        initial={{
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          right: '30vw',
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
                right: '30vw',
              }
        }
      >
        <div className="flex items-start justify-between gap-3 mb-10">
          <Logo />
          <button onClick={closeFn}>
            <ICX className="w-3 h-3 text-gray-400" />
          </button>
        </div>
        <div>{children}</div>
      </motion.div>
    </>,
    document.body,
  );
}
