import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);

      setMatches(mediaQueryList.matches);
      const handler = (event: any) => setMatches(event.matches);
      mediaQueryList.addEventListener('change', handler);

      return () => mediaQueryList.removeEventListener('change', handler);
    }
  }, [query]);

  return matches;
};
