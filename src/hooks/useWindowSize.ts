// Importing part
import { useEffect, useState } from 'react';

// Creating and exporting custom hook of useWindowSize as defulat
// This hook returns actual value of window.innerWidth as state which avoids errors in renderings
export default function useWindowSize(): number {
  // Defining states
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  // Using useEffect to change the state
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Returning value of state
  return windowWidth;
}
