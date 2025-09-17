'use client';

import { ToastContentProps } from 'react-toastify';
import styles from '@/styles/animation.module.css';
import { HTMLAttributes, useEffect, useState } from 'react';

type Props = ToastContentProps<{
  title: string;
  subtitle: string;
  type: 'success' | 'error';
}>;

// -----------------------------

export function CustomToast(props: Props) {
  const { data, closeToast, isPaused, toastProps } = props;

  const [seconds, setSeconds] = useState(5);
  const isSuccess = data.type === 'success';
  const color = isSuccess ? '#16a34a' : '#f30f26';

  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  // === CountDown-Timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // === Circle-SVG Animation-Control
  if (typeof toastProps.progress === 'number') {
    attributes.style = {
      transition: 'all .1s linear',
      strokeDashoffset: `${strokeDash - strokeDash * toastProps.progress}px`,
    };

    if (toastProps.progress >= 1) {
      attributes.onTransitionEnd = () => {
        closeToast();
      };
    }
  } else {
    attributes.className = styles.animate;
    attributes.style = {
      animationDuration: `${toastProps.autoClose}ms`,
      animationPlayState: isPaused ? 'paused' : 'running',
    };

    attributes.onAnimationEnd = () => {
      closeToast();
    };
  }

  return (
    <div className="w-full bg-white font-sans p-4 flex items-center gap-6 rounded-xl">
      <div className="flex-1 space-y-0.5">
        <p className="font-extrabold text-cs85/6" style={{ color }}>
          {data.title}
        </p>

        <p className="text-cs08/6 text-zinc-800 font-semibold">
          {data.subtitle}
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
