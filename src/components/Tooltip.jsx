import { useState } from 'react';
import './Tooltip.css';

/**
 * Basic tooltip — shows on hover/focus of the trigger.
 * position: 'top' | 'bottom' | 'left' | 'right'
 */
export const Tooltip = ({ content, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className={`tooltip tooltip--${position}`} role="tooltip">
          {content}
        </span>
      )}
    </span>
  );
};
