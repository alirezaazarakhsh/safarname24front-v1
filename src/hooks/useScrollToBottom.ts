import { useEffect, useState } from 'react';

// -----------------------------------------------

const useScrollToBottom = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setIsBottom(scrollTop + clientHeight >= scrollHeight - 5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
};

export default useScrollToBottom;
