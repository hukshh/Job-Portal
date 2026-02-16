import './Badge.css';

/**
 * Small inline badge — used for job type and level labels.
 * variant: 'default' | 'success' | 'warning' | 'info'
 */
export const Badge = ({ label, variant = 'default' }) => (
  <span className={`badge badge--${variant}`}>{label}</span>
);
