import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import './Dropdown.css';

/**
 * Accessible dropdown menu.
 * items: [{ label, onClick, icon?, danger? }]
 * trigger: ReactNode — the element that opens the menu
 */
export const Dropdown = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <div className="dropdown__trigger" onClick={() => setIsOpen((v) => !v)}>
        {trigger}
      </div>
      {isOpen && (
        <ul
          className={cn('dropdown__menu', `dropdown__menu--${align}`)}
          role="menu"
        >
          {items.map((item, idx) => (
            <li key={idx} role="none">
              <button
                type="button"
                role="menuitem"
                className={cn('dropdown__item', item.danger && 'dropdown__item--danger')}
                onClick={() => { item.onClick(); setIsOpen(false); }}
              >
                {item.icon && <span className="dropdown__item-icon">{item.icon}</span>}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
