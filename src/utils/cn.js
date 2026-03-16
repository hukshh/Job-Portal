/**
 * Tiny classname utility — filters falsy values.
 * Avoids pulling in clsx for something so small.
 *
 * Usage: cn('btn', isActive && 'btn--active', className)
 */
export const cn = (...classes) =>
  classes.filter(Boolean).join(' ');
