/**
 * Date utilities for the job portal
 */

/**
 * Returns a human-friendly "X days ago" label.
 * @param {string} dateStr - ISO date string e.g. "2026-02-01"
 */
export const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const posted = new Date(dateStr);
  const now = new Date();
  const diffMs = now - posted;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
};

/**
 * Format an ISO date string to readable format: "Feb 5, 2026"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
