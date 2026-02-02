/**
 * Utility functions for formatting display values in the UI
 */

/**
 * Truncate a string to maxLen characters, appending ellipsis if needed.
 * Used in JobCard description preview.
 */
export const truncate = (str, maxLen = 120) => {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + '…';
};

/**
 * Format a salary string — for now just returns it unchanged,
 * but we might need to normalize formats later (e.g. "85k" vs "$85,000")
 */
export const formatSalary = (salary) => salary ?? 'Not disclosed';

/**
 * Returns a short mode badge label
 */
export const modeLabel = (mode) => {
  const map = { Remote: '🌐 Remote', Hybrid: '🏢 Hybrid', 'On-site': '📍 On-site' };
  return map[mode] ?? mode;
};
