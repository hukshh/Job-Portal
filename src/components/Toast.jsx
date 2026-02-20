import { useEffect } from 'react';
import './Toast.css';

/**
 * Simple toast notification. Auto-dismisses after `duration` ms.
 * type: 'success' | 'error' | 'info'
 */
export const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="alert">
      <span className="toast__message">{message}</span>
      <button
        type="button"
        className="toast__close"
        onClick={onClose}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
};
