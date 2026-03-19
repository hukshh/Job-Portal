import './StatCard.css';

/**
 * Simple stat display card — used in dashboard/profile overview.
 * icon: emoji or SVG string
 */
export const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    {icon && <span className="stat-card__icon">{icon}</span>}
    <div>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  </div>
);
