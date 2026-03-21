import { cn } from '../utils/cn';
import './Chip.css';

/**
 * Chip — like Badge but clickable, for filter/tag selection.
 * active: highlights when selected
 */
export const Chip = ({ label, active, onClick, icon }) => (
  <button
    type="button"
    className={cn('chip', active && 'chip--active')}
    onClick={onClick}
  >
    {icon && <span className="chip__icon">{icon}</span>}
    {label}
  </button>
);
