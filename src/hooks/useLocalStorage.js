import { useState } from 'react';
import { storage } from '../utils/storage';

/**
 * Like useState but backed by localStorage.
 * Useful for persisting small pieces of UI state (filters, preferences, etc.)
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if nothing is stored
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = storage.get(key);
    return item !== null ? item : initialValue;
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    storage.set(key, valueToStore);
  };

  const removeValue = () => {
    setStoredValue(initialValue);
    storage.remove(key);
  };

  return [storedValue, setValue, removeValue];
};
