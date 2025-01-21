import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        cs06: '0.6rem',
        cs65: '0.65rem',
        cs07: '0.7rem',
        cs75: '0.75rem',
        cs08: '0.8rem',
        cs85: '0.85rem',
        cs09: '0.9rem',
        cs95: '0.95rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        outfit: ['var(--font-outfit)'],
      },
      colors: {},
      borderRadius: {},
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
