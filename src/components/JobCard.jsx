import './JobCard.css';

export const JobCard = ({ job, onApply, onSave, isSaved }) => (
  <article className="job-card">
    <div className="job-card__header">
      <div>
        <p className="job-card__eyebrow">{job.company}</p>
        <h3>{job.title}</h3>
      </div>
      <span className="job-card__type">{job.type}</span>
    </div>

    <p className="job-card__description">{job.description}</p>

    <ul className="job-card__meta">
      <li>{job.location}</li>
      <li>{job.mode}</li>
      <li>{job.level}</li>
      <li>{job.salary}</li>
    </ul>

    <div className="job-card__tags">
      {job.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>

    <div className="job-card__actions">
      <button type="button" onClick={() => onApply(job)}>
        Apply
      </button>
      <button
        type="button"
        className={isSaved ? 'saved' : 'ghost'}
        onClick={() => onSave(job.id)}
      >
        {isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  </article>
);



