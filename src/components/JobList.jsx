import { JobCard } from './JobCard';
import './JobList.css';

export const JobList = ({ jobs, savedJobs, onApply, onSave }) => {
  if (!jobs.length) {
    return (
      <div className="job-list__empty">
        <p>No roles match your search right now. Try another keyword.</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onApply={onApply}
          onSave={onSave}
          isSaved={savedJobs.some((saved) => saved.id === job.id)}
        />
      ))}
    </div>
  );
};



