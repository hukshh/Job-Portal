import { EmptyState } from './EmptyState';
import './SavedJobsPanel.css';

export const SavedJobsPanel = ({ jobs }) => (
  <aside className="saved-jobs-panel">
    <h4 className="saved-jobs-panel__heading">Saved Jobs</h4>
    {jobs.length === 0 ? (
      <EmptyState
        icon="🔖"
        title="Nothing saved yet"
        message="Hit Save on any listing to keep it here."
      />
    ) : (
      <ul className="saved-jobs-panel__list">
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong>
            <span>{job.company}</span>
          </li>
        ))}
      </ul>
    )}
  </aside>
);
