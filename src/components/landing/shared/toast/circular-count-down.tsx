import { useEffect, useState } from 'react';

type Props = {
  duration: number;
  type: 'success' | 'error';

  // -----------------------------
};

export default function CircularCountDown({ duration, type }: Props) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  const [timeLeft, setTimeLeft] = useState(duration);

  const color = type === 'success' ? '#22c55e' : '#ef4444';

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const progress = timeLeft / duration;

  return (
    <div className="relative w-11 mr-auto aspect-square">
      <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>

      <span
        style={{ color }}
        className="absolute inset-0 flex items-center justify-center text-cs08 font-bold text-zinc-700 pt-0.5"
      >
        {timeLeft <= 1 ? 1 : timeLeft}
      </span>
    </div>
  );
}
