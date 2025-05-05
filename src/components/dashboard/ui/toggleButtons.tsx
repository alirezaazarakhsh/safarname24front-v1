// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ToggleButtonsPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';

// Creating and exporting ToggleButtons component as default
export default function ToggleButtons({
  buttons,
  className,
  onChange,
}: ToggleButtonsPropsType): ReactNode {
  // Defining states of component
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

  // Attaching onChange prop to component
  useEffect(() => onChange && onChange(activeButtonIndex), [activeButtonIndex]);

  // Returning JSX
  return (
    <div
      className={cn(
        'flex gap-3 bg-white relative rounded-lg overflow-hidden',
        className,
      )}
    >
      <div
        className="bg-blue-700 w-[100px] transition-all duration-500 h-full rounded-lg top-0 absolute z-0"
        style={{
          right: activeButtonIndex === 0 ? '0px' : '112px',
        }}
      />
      {buttons.map((item, index) => (
        <button
          data-active={activeButtonIndex === index}
          className="z-10 w-[100px] px-3 bg-transparent rounded-lg transition-all duration-500 flex items-center justify-center data-[active='true']:text-white data-[active='false']:text-black"
          key={index}
          onClick={() => setActiveButtonIndex(index)}
        >
          <span className="text-cs65 font-normal w-full block text-center truncate text-current">
            {item}
          </span>
        </button>
      ))}
    </div>
  );
}
