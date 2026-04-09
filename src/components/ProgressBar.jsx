import './ProgressBar.css';

/**
 * Horizontal progress bar — used for profile completion indicator.
 * value: 0-100
 */
export const ProgressBar = ({ value, label, showPercent = true }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="progress-bar">
      {label && (
        <div className="progress-bar__header">
          <span className="progress-bar__label">{label}</span>
          {showPercent && (
            <span className="progress-bar__percent">{clamped}%</span>
          )}
        </div>
      )}
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
