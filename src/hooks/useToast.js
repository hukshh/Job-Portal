import { useState, useCallback } from 'react';

/**
 * useToast — manages a single toast notification at a time.
 * Returns { toast, showToast, hideToast } to use with <Toast>.
 */
export const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ message: '', type: 'info' });
  }, []);

  return { toast, showToast, hideToast };
};
