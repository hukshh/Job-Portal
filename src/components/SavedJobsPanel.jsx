import './SavedJobsPanel.css';

export const SavedJobsPanel = ({ jobs }) => (
  <section className="saved-jobs">
    <div className="saved-jobs__header">
      <h4>Saved roles</h4>
      <span>{jobs.length}</span>
    </div>
    {jobs.length ? (
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <p>{job.title}</p>
            <small>{job.company}</small>
          </li>
        ))}
      </ul>
    ) : (
      <p className="saved-jobs__empty">
        Star roles you like and they will show up here.
      </p>
    )}
  </section>
);



