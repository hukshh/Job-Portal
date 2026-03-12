import './FormField.css';

/**
 * Generic form field wrapper — label + input/textarea + error message.
 * Reduces boilerplate in form components.
 */
export const FormField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  multiline,
  rows = 4,
}) => (
  <div className="form-field">
    <label htmlFor={id} className="form-field__label">
      {label}
      {required && <span className="form-field__required" aria-hidden>*</span>}
    </label>
    {multiline ? (
      <textarea
        id={id}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
      />
    ) : (
      <input
        id={id}
        type={type}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    )}
    {error && <span className="form-field__error" role="alert">{error}</span>}
  </div>
);
