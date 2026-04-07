import { FILTER_TYPES } from '../constants/jobFilters';
import { Chip } from './Chip';
import { SortSelect } from './SortSelect';
import './SearchPanel.css';

export const SearchPanel = ({
  searchTerm,
  onSearch,
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
  resultCount,
  filters = FILTER_TYPES,
}) => {
  const hasActiveFilter = selectedType !== 'All' || searchTerm.trim();

  const clearAll = () => {
    onSearch('');
    onSelectType('All');
  };

  return (
    <section className="search-panel">
      <div className="search-panel__row">
        <label htmlFor="search-input" className="sr-only">
          Search by role, company, or keyword
        </label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          placeholder="🔍  Search by role, company, or keyword"
          onChange={(e) => onSearch(e.target.value)}
        />
        {onSortChange && <SortSelect value={sortBy} onChange={onSortChange} />}
      </div>

      <div className="search-panel__bottom">
        <div className="filter-row">
          {filters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              active={filter === selectedType}
              onClick={() => onSelectType(filter)}
            />
          ))}
        </div>
        {hasActiveFilter && (
          <button type="button" className="search-panel__clear" onClick={clearAll}>
            Clear filters
          </button>
        )}
      </div>

      {typeof resultCount === 'number' && searchTerm.trim() && (
        <p className="search-panel__hint">
          {resultCount} result{resultCount !== 1 ? 's' : ''} for &quot;{searchTerm}&quot;
        </p>
      )}
    </section>
  );
};
