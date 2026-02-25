import { Modal } from './Modal';
import { Badge } from './Badge';
import { formatDate } from '../utils/dateUtils';
import './JobDetailModal.css';

const TYPE_VARIANT = {
  'Full-time': 'success',
  'Part-time': 'info',
  'Contract': 'warning',
  'Internship': 'default',
};

/**
 * Shows full job details in a modal overlay.
 * Triggered from JobCard "View Details" — wip, button not added to JobCard yet.
 */
export const JobDetailModal = ({ job, isOpen, onClose, onApply }) => {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={job.title}>
      <div className="job-detail">
        <div className="job-detail__meta-row">
          <span className="job-detail__company">{job.company}</span>
          <Badge label={job.type} variant={TYPE_VARIANT[job.type] ?? 'default'} />
        </div>

        <dl className="job-detail__grid">
          <div>
            <dt>Location</dt>
            <dd>{job.location} · {job.mode}</dd>
          </div>
          <div>
            <dt>Level</dt>
            <dd>{job.level}</dd>
          </div>
          <div>
            <dt>Salary</dt>
            <dd>{job.salary}</dd>
          </div>
          {job.postedAt && (
            <div>
              <dt>Posted</dt>
              <dd>{formatDate(job.postedAt)}</dd>
            </div>
          )}
        </dl>

        <p className="job-detail__description">{job.description}</p>

        <div className="job-detail__tags">
          {job.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <button
          type="button"
          className="job-detail__apply-btn"
          onClick={() => { onApply(job); onClose(); }}
        >
          Apply Now
        </button>
      </div>
    </Modal>
  );
};
