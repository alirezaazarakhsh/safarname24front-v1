// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import { CardShowCasePropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { Check } from 'lucide-react';
import { JSX } from 'react';

// Creating and exporting CardShowCase component as default
export default function CardShowCase({
  className,
  data,
}: CardShowCasePropsType): JSX.Element {
  // Returning JSX
  return (
    <div className={cn('bg-cs-red/50 rounded-lg p-4', className)}>
      <div>hihihih</div>
    </div>
  );
}
