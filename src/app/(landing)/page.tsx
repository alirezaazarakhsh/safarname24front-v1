import HeroSection from '@/pages/home/hero-section/hero-section';
import { div } from 'motion/react-client';
import Image from 'next/image';

// ------------------------------

export default function Home() {
  return (
    <div className="h-[200vh]">
      <HeroSection />
    </div>
  );
}
