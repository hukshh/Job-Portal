import { useState } from 'react';
import './ApplicationPanel.css';

const INITIAL_FORM = { name: '', email: '', phone: '', note: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ApplicationPanel = ({ job, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const next = {};
    if (!formValues.name.trim()) next.name = 'Full name is required.';
    if (!formValues.email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_RE.test(formValues.email)) next.email = 'Enter a valid email.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const success = onSubmit(formValues);
    if (success) {
      setFormValues(INITIAL_FORM);
      setErrors({});
    }
  };

  return (
    <aside className="application-panel">
      <div className="application-panel__header">
        <div>
          <p className="eyebrow">Applying for</p>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close form">×</button>
      </div>

      <form onSubmit={handleSubmit} className="application-panel__form" noValidate>
        <label>
          Full name *
          <input
            type="text"
            value={formValues.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>

        <label>
          Email *
          <input
            type="email"
            value={formValues.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label>
          Phone (optional)
          <input
            type="tel"
            value={formValues.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </label>

        <label>
          Quick note or link
          <textarea
            rows="3"
            value={formValues.note}
            onChange={(e) => handleChange('note', e.target.value)}
          />
        </label>

        <button type="submit">Submit interest</button>
      </form>
    </aside>
  );
};
