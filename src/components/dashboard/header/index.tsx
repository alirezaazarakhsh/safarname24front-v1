// Importing part
import { ReactNode } from 'react';
import TopSide from './topSide';
import NavBar from './navBar';
import { useScrollPosition } from '@/hooks';

// Creating and exporting Header component for dashboard pages as default
export default function Header(): ReactNode {
  // Defining scroll position of whole page in y axis
  const scrollY = useScrollPosition();

  // Returning JSX
  return (
    <header
      data-scrolled={scrollY !== 0}
      className="lg:bg-white lg:data-[scrolled='false']:bg-white bg-transparent transition-all duration-500 data-[scrolled='false']:bg-transparent data-[scrolled='true']:bg-white lg:shadow-none shadow-2xl data-[scrolled='false']:shadow-transparent data-[scrolled='true']:shadow-black/20 lg:static sticky top-0 left-0 w-full z-30"
    >
      <TopSide />
      <NavBar />
    </header>
  );
}
