'use client';

import { toast } from 'sonner';
import styles from '@/styles/animation.module.css';
import { HTMLAttributes, useEffect, useState } from 'react';

type Props = {
  title: string;
  subtitle: string;
  duration?: number;
  id: string | number;
  type: 'success' | 'error';
};

// -----------------------------

export function CustomSoonerToast({
  id,
  type,
  title,
  subtitle,
  duration = 5000,
}: Props) {
  const [seconds, setSeconds] = useState(duration / 1000);
  const isSuccess = type === 'success';
  const color = isSuccess ? '#16a34a' : '#f30f26';

  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  // === CountDown-Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          toast.dismiss(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [id]);

  // === Circle-SVG Animation-Control
  attributes.className = styles.animate;
  attributes.style = {
    animationDuration: `${duration}ms`,
  };
  attributes.onAnimationEnd = () => {
    toast.dismiss(id);
  };

  return (
    <div className="w-full bg-white font-sans p-5 pl-4 flex items-center gap-6 rounded-xl shadow-[0_0.3rem_2rem_rgba(0,0,0,0.1)]">
      <div className="flex-1 space-y-0.5">
        <p className="font-extrabold text-cs85/6" style={{ color }}>
          {title}
        </p>

        <p className="text-cs08/6 text-zinc-800 font-semibold truncate">
          {subtitle}
        </p>
      </div>

      <svg
        width="50"
        height="50"
        viewBox="-25 -25 250 250"
        className="mr-auto -rotate-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r="90"
          cx="100"
          cy="100"
          stroke={color}
          strokeWidth="15"
          fill="transparent"
          strokeLinecap="round"
          strokeDashoffset="0"
          strokeDasharray={`${strokeDash}px`}
        />

        <circle
          r="90"
          cx="100"
          cy="100"
          stroke="#f4f4f5"
          strokeWidth="20"
          fill="transparent"
          strokeDasharray={`${strokeDash}px`}
          {...attributes}
        />

        <text
          x="100"
          y="120"
          fill={color}
          fontSize="65"
          fontWeight="800"
          textAnchor="middle"
          transform="rotate(90,100,100)"
        >
          {seconds === 0 ? 1 : seconds}
        </text>
      </svg>
    </div>
  );
}
