import { useEffect } from 'react';
import { JobCard } from './JobCard';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import { usePagination } from '../hooks/usePagination';
import './JobList.css';

const PAGE_SIZE = 6;

export const JobList = ({ jobs, savedJobs, onApply, onSave, onView }) => {
  const savedIds = new Set(savedJobs.map((j) => j.id));

  const { paginatedItems, currentPage, totalPages, goToPage, reset } =
    usePagination(jobs, PAGE_SIZE);

  // reset to page 1 when job list (search/filter result) changes
  useEffect(() => {
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs.length]);

  if (jobs.length === 0) {
    return (
      <EmptyState
        icon="🗂️"
        title="No jobs match your search"
        message="Try adjusting your keywords or clearing the filter."
      />
    );
  }

  return (
    <section className="job-list">
      <p className="job-list__count">
        {jobs.length} {jobs.length === 1 ? 'role' : 'roles'} found
      </p>
      {paginatedItems.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedIds.has(job.id)}
          onApply={onApply}
          onSave={onSave}
          onView={onView}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </section>
  );
};
