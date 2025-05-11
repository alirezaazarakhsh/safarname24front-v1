// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ToggleButtonsPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';

// Creating and exporting ToggleButtons component as default
// Specify the width of the toggle buttons
export default function ToggleButtons({
  buttons,
  className,
  onChange,
  width,
}: ToggleButtonsPropsType): ReactNode {
  // Defining states of component
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

  // Attaching onChange prop to component
  useEffect(() => onChange && onChange(activeButtonIndex), [activeButtonIndex]);

  // Returning JSX
  return (
    <div
      className={cn(
        'flex bg-white relative lg:rounded-lg rounded-[6px] overflow-hidden',
        width,
        className,
      )}
    >
      <div
        className="bg-blue-700 w-[50%] transition-all duration-500 h-full rounded-lg top-0 absolute z-0 data-[activeBtn='0']:right-0 data-[activeBtn='1']:right-[50%]"
        data-activeBtn={activeButtonIndex}
      />
      {buttons.map((item, index) => (
        <button
          data-active={activeButtonIndex === index}
          className="z-10 w-[50%] px-3 bg-transparent lg:rounded-lg rounded-[6px] transition-all duration-500 flex items-center justify-center data-[active='true']:text-white data-[active='false']:text-black"
          key={index}
          onClick={() => setActiveButtonIndex(index)}
        >
          <span className="lg:text-cs65 text-[12px] lg:font-normal font-semibold w-full block text-center truncate text-current">
            {item}
          </span>
        </button>
      ))}
    </div>
  );
}
