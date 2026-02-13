import { useEffect, useState } from 'react';

/**
 * Debounces a value — useful for search inputs so we don't
 * filter on every single keystroke.
 *
 * @param {*} value - the value to debounce
 * @param {number} delay - milliseconds to wait
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
