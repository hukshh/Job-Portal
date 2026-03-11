import './PageHeader.css';

/**
 * Reusable page header — title + optional subtitle.
 * Used on Profile, Resume, Settings pages.
 */
export const PageHeader = ({ title, subtitle }) => (
  <div className="page-header">
    <h2 className="page-header__title">{title}</h2>
    {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
  </div>
);
