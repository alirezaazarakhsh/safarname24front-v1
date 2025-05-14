// Importing part
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LoadingComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';

// Creating and exporting Loading component as default
export default function Loading({
  className,
}: LoadingComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className="flex gap-1.5 shrink-0">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn(
            'w-2 h-2 bg-gray-300 rounded-full aspect-square shrink-0',
            className,
          )}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
}
