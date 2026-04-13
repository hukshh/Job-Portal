import { Badge } from './Badge';
import { CompanyLogo } from './CompanyLogo';
import { timeAgo } from '../utils/dateUtils';
import './JobCard.css';

const TYPE_VARIANT = {
  'Full-time': 'success',
  'Part-time': 'info',
  'Contract': 'warning',
  'Internship': 'default',
  'Remote': 'info',
};

export const JobCard = ({ job, onApply, onSave, onView, isSaved }) => (
  <article className="job-card">
    <div className="job-card__header">
      <CompanyLogo company={job.company} size={42} />
      <div className="job-card__title-block">
        <p className="job-card__eyebrow">{job.company}</p>
        <h3>{job.title}</h3>
      </div>
      <Badge label={job.type} variant={TYPE_VARIANT[job.type] ?? 'default'} />
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

    {job.postedAt && (
      <p className="job-card__posted">Posted {timeAgo(job.postedAt)}</p>
    )}

    <div className="job-card__actions">
      {onView && (
        <button type="button" className="ghost" onClick={() => onView(job)}>Details</button>
      )}
      <button type="button" onClick={() => onApply(job)}>Apply</button>
      <button
        type="button"
        className={isSaved ? 'saved' : 'ghost'}
        onClick={() => onSave(job.id)}
      >
        {isSaved ? '✓ Saved' : 'Save'}
      </button>
    </div>
  </article>
);
