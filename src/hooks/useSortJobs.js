import { useMemo } from 'react';

/**
 * Sorts an array of jobs by the given criterion.
 * sortBy: 'newest' | 'oldest' | 'salary-high' | 'salary-low'
 *
 * Salary sorting attempts to parse the first number from the salary string
 * e.g. "$85k - $105k" → 85000
 */
const parseSalary = (salaryStr) => {
  if (!salaryStr) return 0;
  const match = salaryStr.match(/\$?([\d.]+)k?/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  return salaryStr.toLowerCase().includes('k') ? num * 1000 : num;
};

export const useSortJobs = (jobs, sortBy = 'newest') => {
  return useMemo(() => {
    const arr = [...jobs];
    if (sortBy === 'newest') {
      return arr.sort((a, b) => new Date(b.postedAt ?? 0) - new Date(a.postedAt ?? 0));
    }
    if (sortBy === 'oldest') {
      return arr.sort((a, b) => new Date(a.postedAt ?? 0) - new Date(b.postedAt ?? 0));
    }
    if (sortBy === 'salary-high') {
      return arr.sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    }
    if (sortBy === 'salary-low') {
      return arr.sort((a, b) => parseSalary(a.salary) - parseSalary(b.salary));
    }
    return arr;
  }, [jobs, sortBy]);
};
