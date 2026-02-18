import './Spinner.css';

/**
 * Simple loading spinner.
 * size: 'sm' | 'md' | 'lg'
 */
export const Spinner = ({ size = 'md', label = 'Loading…' }) => (
  <div className={`spinner spinner--${size}`} role="status" aria-label={label}>
    <span className="spinner__ring" />
  </div>
);
