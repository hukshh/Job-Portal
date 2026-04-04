import { useMemo, useState } from 'react';

/**
 * Client-side pagination logic.
 * Returns paginated items, currentPage, totalPages, and navigation functions.
 *
 * @param {Array} items - full array of items to paginate
 * @param {number} pageSize - items per page
 */
export const usePagination = (items, pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // clamp page if items shrink (e.g. after a filter change)
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // reset to page 1 when filter changes cause total to shrink
  const reset = () => setCurrentPage(1);

  return {
    paginatedItems,
    currentPage: safePage,
    totalPages,
    goToPage,
    reset,
  };
};
