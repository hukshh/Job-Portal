import './Divider.css';

/**
 * Horizontal rule with optional label.
 * Used between form sections, card sections, etc.
 */
export const Divider = ({ label }) => (
  <div className="divider">
    {label ? (
      <>
        <span className="divider__line" />
        <span className="divider__label">{label}</span>
        <span className="divider__line" />
      </>
    ) : (
      <span className="divider__line divider__line--full" />
    )}
  </div>
);
