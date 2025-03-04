'use client';

import { useMediaQuery } from '@/hooks';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const buttonStyle =
  'bg-zinc-200 text-zinc-800 text-cs75 font-semibold px-4 py-1.5 rounded-md';

type Props = {
  description: string;
};

// -----------------------------------------

export function Description(props: Props) {
  const { description } = props;

  const [linesCount, setLinesCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [windowSize, setWindowSize] = useState(0);
  const descRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    descRef.current &&
      setLinesCount(Math.ceil(descRef.current.scrollHeight / 28));
  }, [windowSize]);

  const minLines = 4;
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  if (!description) return null;

  return (
    <div>
      <motion.div
        ref={descRef}
        initial={false}
        animate={{
          height:
            isDesktop || linesCount <= minLines
              ? 'auto'
              : isExpanded
                ? 'auto'
                : `${minLines * 1.8}em`,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="text-zinc-600 text-cs75/[1.3rem] text-justify font-semibold overflow-hidden lg:text-cs08/6"
      >
        {description}
      </motion.div>

      {/* Show (More/Less) Button */}
      <AnimatePresence initial={false}>
        <div
          className={`mt-4 ${isDesktop || linesCount <= minLines ? 'hidden' : ''}`}
        >
          {isExpanded ? (
            <motion.button
              key="box-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ ease: 'linear' }}
              className={buttonStyle}
              onClick={() => setIsExpanded(false)}
            >
              بستن
            </motion.button>
          ) : (
            <motion.button
              key="box-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ ease: 'linear' }}
              className={buttonStyle}
              onClick={() => setIsExpanded(true)}
            >
              مشاهده بیشتر
            </motion.button>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
