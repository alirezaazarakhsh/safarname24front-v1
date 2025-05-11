'use client';

import { FiCopy } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

// -----------------------------------------------------

export default function CopyLink() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      alert('مشکلی در کپی کردن لینک پیش اومد 😓');
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="bg-white h-16 text-cs85 px-3 flex items-center gap-4 rounded-cs-10 shadow-[0_0.5rem_1rem_rgba(0,0,0,0.03)]">
      <div className="w-11 flex-center aspect-square border-2 rounded-lg">
        <FiCopy color="#333" size={22} />
      </div>

      <span className="text-zinc-800 font-bold">کپی لینک</span>
      <button
        onClick={copyLink}
        rel="noopener noreferrer"
        className={`w-24 h-10 text-cs08 font-bold mr-auto flex-center rounded-lg transition-colors duration-200 ease-in-out ${copied ? 'bg-cs-blue text-white' : 'bg-cs-blue/15 text-cs-blue'}`}
      >
        {copied ? 'کپی شد' : 'ارسال لینک'}
      </button>
    </div>
  );
}
