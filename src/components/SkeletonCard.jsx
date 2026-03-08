import './SkeletonCard.css';

/**
 * Skeleton placeholder shown while jobs are loading.
 * count: number of skeleton cards to render
 */
export const SkeletonCard = ({ count = 3 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton-card" aria-hidden="true">
        <div className="skeleton-card__line skeleton-card__line--title" />
        <div className="skeleton-card__line skeleton-card__line--subtitle" />
        <div className="skeleton-card__line skeleton-card__line--body" />
        <div className="skeleton-card__line skeleton-card__line--body" />
        <div className="skeleton-card__tags">
          <div className="skeleton-card__tag" />
          <div className="skeleton-card__tag" />
          <div className="skeleton-card__tag" />
        </div>
      </div>
    ))}
  </>
);
