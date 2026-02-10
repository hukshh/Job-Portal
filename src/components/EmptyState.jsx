import './EmptyState.css';

/**
 * Generic empty state component.
 * Used when a list has no results — search, saved jobs, etc.
 */
export const EmptyState = ({ icon = '🔍', title, message, action }) => (
  <div className="empty-state">
    <span className="empty-state__icon">{icon}</span>
    <h4 className="empty-state__title">{title}</h4>
    {message && <p className="empty-state__message">{message}</p>}
    {action && (
      <button type="button" className="empty-state__action" onClick={action.onClick}>
        {action.label}
      </button>
    )}
  </div>
);
