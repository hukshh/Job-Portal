import { cn } from '../utils/cn';
import './Avatar.css';

/**
 * User avatar — shows initials if no image src.
 * size: 'sm' | 'md' | 'lg'
 */
export const Avatar = ({ src, name, size = 'md', className }) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className={cn('avatar', `avatar--${size}`, className)}>
      {src ? (
        <img src={src} alt={name ?? 'User avatar'} className="avatar__img" />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
};
