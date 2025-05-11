'use client';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import { useScrollPosition } from '@/hooks';
import SearchBar from './search/SearchBar';
import useScrollToBottom from '@/hooks/useScrollToBottom';

type Props = {
  showInStatic?: boolean;
  scrollFromTop?: number;
  showSearchBar?: boolean;
  fixedClassName?: string;
  staticClassName?: string;
  children?: React.ReactNode;
};

// -----------------------------------------------

export default function StickyArea(props: Props) {
  const {
    children,
    fixedClassName,
    staticClassName,
    showInStatic = true,
    scrollFromTop = 300,
    showSearchBar = true,
  } = props;

  const isBottom = useScrollToBottom();
  const scrollPosition = useScrollPosition();

  const showStickyArea = !isBottom && scrollPosition > scrollFromTop;
  if (!showSearchBar && !children) return null;

  return (
    <>
      {/* Static-Area */}
      <div
        className={clsx('mt-2 flex flex-col gap-4 lg:hidden', staticClassName)}
      >
        {showSearchBar && <SearchBar />}
        {showInStatic && children}
      </div>

      {/* Fixed-Area */}
      <AnimatePresence>
        {showStickyArea && (
          <motion.div
            key="fixed-area"
            animate={{ transform: 'translateY(0)' }}
            exit={{ transform: 'translateY(-100%)' }}
            initial={{ transform: 'translateY(-100%)' }}
            className={clsx(
              'fixed z-20 top-0 inset-x-0 bg-white p-5 flex flex-col gap-4 border-b shadow-[0_0_2rem_rgba(0,0,0,0.1)] transition-all duration-1000 ease-in-out lg:hidden',
              fixedClassName,
            )}
          >
            {showSearchBar && <SearchBar />}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
