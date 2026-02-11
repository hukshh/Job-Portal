import { JobCard } from './JobCard';
import { EmptyState } from './EmptyState';
import './JobList.css';

export const JobList = ({ jobs, savedJobs, onApply, onSave }) => {
  const savedIds = new Set(savedJobs.map((j) => j.id));

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
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedIds.has(job.id)}
          onApply={onApply}
          onSave={onSave}
        />
      ))}
    </section>
  );
};
