import { cn } from '../utils/cn';
import './Card.css';

/**
 * Generic card container.
 * elevated: adds box shadow
 */
export const Card = ({ children, className, elevated = false, ...props }) => (
  <div className={cn('card', elevated && 'card--elevated', className)} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={cn('card__header', className)}>{children}</div>
);

export const CardBody = ({ children, className }) => (
  <div className={cn('card__body', className)}>{children}</div>
);

export const CardFooter = ({ children, className }) => (
  <div className={cn('card__footer', className)}>{children}</div>
);
