import { useEffect, useState } from 'react';

/**
 * Returns the current window dimensions.
 * Useful for responsive logic that CSS can't handle alone.
 */
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// Convenience boolean helpers
export const useIsMobile = () => useWindowSize().width < 768;
export const useIsTablet = () => {
  const { width } = useWindowSize();
  return width >= 768 && width < 1024;
};
