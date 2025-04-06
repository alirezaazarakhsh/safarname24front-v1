'use client';

import { useScrollPosition } from '@/hooks';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

// -----------------------------------------------

export default function StickyArea(props: Props) {
  const isBottom = useScrollToBottom();
  const scrollPosition = useScrollPosition();

  const showStickyArea = !isBottom && scrollPosition > 300;
  if (!props.children) return null;

  return (
    <>
      {/* Static-Area */}
      <div className="bg-[--clr-main-light] mt-2 flex flex-col gap-4 lg:hidden">
        {props.children}
      </div>

      {/* Fixed-Area */}
      <AnimatePresence>
        {showStickyArea && (
          <motion.div
            key="fixed-area"
            initial={{ transform: 'translateY(-100%)' }}
            animate={{ transform: 'translateY(0)' }}
            exit={{ transform: 'translateY(-100%)' }}
            className={`fixed z-20 top-0 inset-x-0 bg-[--clr-main-light] p-5 flex flex-col gap-4 border-b shadow-[0_0_2rem_rgba(0,0,0,0.1)] transition-all duration-1000 ease-in-out lg:hidden `}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
