// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { HTMLAttributes, ReactNode } from 'react';

// Creating and exporting PlayIcon component as default
export default function PlayIcon(props: HTMLAttributes<SVGElement>): ReactNode {
  // Returning JSX
  return (
    <svg
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 9.23205C-0.333331 8.46225 -0.333334 6.53775 0.999999 5.76795L9.25 1.00481C10.5833 0.23501 12.25 1.19726 12.25 2.73686L12.25 12.2631C12.25 13.8027 10.5833 14.765 9.25 13.9952L1 9.23205Z"
        fill="currentColor"
      />
    </svg>
  );
}
