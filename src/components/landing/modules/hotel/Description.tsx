'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useMediaQuery } from '@/hooks';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  description: string;
};

type ApiResponse = {
  data: Data;
};

type Props = {
  hotelSlug: string;
};

const buttonStyle =
  'bg-zinc-200 text-zinc-800 text-cs75 font-semibold px-4 py-1.5 rounded-md';

// -----------------------------------------

export function Description(props: Props) {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-description'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${props.hotelSlug}/description`),
  });

  const description = data?.data.description;

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

  if (status !== 'pending' && !description) return null;

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
        className="text-zinc-600 text-cs08/6 text-justify font-semibold overflow-hidden lg:text-cs85/7"
      >
        {status === 'pending' ? (
          <div className="grid gap-2">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-6" />
              ))}
          </div>
        ) : (
          description
        )}
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
