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
  filters = FILTER_TYPES,
}) => (
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
  </section>
);
