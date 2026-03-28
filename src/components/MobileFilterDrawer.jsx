import { FILTER_TYPES } from '../constants/jobFilters';
import { Chip } from './Chip';
import './MobileFilterDrawer.css';

/**
 * Slide-up filter drawer for mobile.
 * isOpen: controlled from parent
 * TODO: add animation — currently just show/hide
 */
export const MobileFilterDrawer = ({
  isOpen,
  onClose,
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="filter-drawer-overlay" onClick={onClose}>
      <div className="filter-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="filter-drawer__handle" />
        <h4 className="filter-drawer__title">Filter & Sort</h4>

        <p className="filter-drawer__section-label">Job type</p>
        <div className="filter-drawer__chips">
          {FILTER_TYPES.map((f) => (
            <Chip key={f} label={f} active={f === selectedType} onClick={() => onSelectType(f)} />
          ))}
        </div>

        <p className="filter-drawer__section-label">Sort by</p>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-drawer__select"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="salary-high">Salary: high → low</option>
          <option value="salary-low">Salary: low → high</option>
        </select>

        <button type="button" className="filter-drawer__close-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
};
