'use client';

import clsx from 'clsx';
import SearchBar from './search/SearchBar';
import { useScrollPosition } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollToBottom from '@/hooks/useScrollToBottom';

type Props = {
  scrollFromTop?: number;
  fixedClassName?: string;
  staticClassName?: string;
  children?: React.ReactNode;
  childrenStatus?: { static?: boolean; fixed?: boolean };
  searchbarStatus?: { static?: boolean; fixed?: boolean };
};

// -----------------------------------------------

export default function StickyArea(props: Props) {
  const {
    children,
    fixedClassName,
    staticClassName,
    scrollFromTop = 300,
    searchbarStatus = { static: true, fixed: true },
    childrenStatus = { static: false, fixed: false },
  } = props;

  const isBottom = useScrollToBottom();
  const scrollPosition = useScrollPosition();

  const showStickyArea = !isBottom && scrollPosition > scrollFromTop;

  return (
    <>
      {/* === Static-Area */}
      <div className={clsx('flex flex-col gap-4 lg:hidden', staticClassName)}>
        {searchbarStatus?.static && <SearchBar />}
        {childrenStatus?.static && children}
      </div>

      {/* === Fixed-Area */}
      <AnimatePresence>
        {showStickyArea && (
          <motion.div
            key="fixed-area"
            animate={{ transform: 'translateY(0)' }}
            exit={{ transform: 'translateY(-100%)' }}
            initial={{ transform: 'translateY(-100%)' }}
            className={clsx(
              'fixed z-20 top-0 inset-x-0 bg-white px-5 py-4 flex flex-col gap-4 border-b shadow-[0_0_2rem_rgba(0,0,0,0.1)] transition-all duration-1000 ease-in-out lg:hidden',
              fixedClassName,
            )}
          >
            {searchbarStatus.fixed && <SearchBar />}
            {childrenStatus?.fixed && children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
