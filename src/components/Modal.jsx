import { useEffect } from 'react';
import './Modal.css';

/**
 * Generic modal overlay.
 * Closes on backdrop click and Escape key.
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="modal-title"
      >
        <div className="modal-box__header">
          {title && <h3 id="modal-title">{title}</h3>}
          <button
            type="button"
            className="modal-box__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="modal-box__body">{children}</div>
      </div>
    </div>
  );
};
