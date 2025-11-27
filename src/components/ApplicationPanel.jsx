import { useState } from 'react';
import './ApplicationPanel.css';

export const ApplicationPanel = ({
  job,
  onClose,
  onSubmit,
  statusMessage,
}) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    note: '',
  });

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = onSubmit(formValues);
    if (success) {
      setFormValues({ name: '', email: '', note: '' });
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
        <button type="button" onClick={onClose} aria-label="Close form">
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="application-panel__form">
        <label>
          Full name
          <input
            type="text"
            value={formValues.name}
            onChange={(event) => handleChange('name', event.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={formValues.email}
            onChange={(event) => handleChange('email', event.target.value)}
            required
          />
        </label>

        <label>
          Quick note or link
          <textarea
            rows="3"
            value={formValues.note}
            onChange={(event) => handleChange('note', event.target.value)}
          />
        </label>

        {statusMessage && (
          <p className="application-panel__status">{statusMessage}</p>
        )}

        <button type="submit">Submit interest</button>
      </form>
    </aside>
  );
};



