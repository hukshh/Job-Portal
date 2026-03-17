import { cn } from '../utils/cn';
import { Spinner } from './Spinner';
import './Button.css';

/**
 * Unified Button component.
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * size: 'sm' | 'md' | 'lg'
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  ...props
}) => (
  <button
    className={cn('btn', `btn--${variant}`, `btn--${size}`, loading && 'btn--loading', className)}
    disabled={disabled || loading}
    {...props}
  >
    {loading && <Spinner size="sm" />}
    {children}
  </button>
);
